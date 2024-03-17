import {CommonModule} from '@angular/common';
import {Component, Inject, Input, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TuiTextareaModule} from '@taiga-ui/kit';
import {combineLatest, debounceTime, startWith, takeUntil, tap} from 'rxjs';
import {Note} from '../../interfaces';
import {NotesFormService} from '../../services/notes-form.service';
import {TuiDestroyService} from '@taiga-ui/cdk';
import {
  NotesLocalStorageService,
  NotesTypeName,
  SelectNotesService,
  TagsCompositionComponent,
  TagsSelectComponent,
} from '../../../../../shared';
import {TuiTextfieldControllerModule} from '@taiga-ui/core';

@Component({
  selector: 'app-note-create',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TuiTextareaModule,
    TuiTextfieldControllerModule,
    TagsCompositionComponent,
    TagsSelectComponent,
  ],
  templateUrl: './note-create.component.html',
  styleUrl: './note-create.component.scss',
  providers: [TuiDestroyService],
})
export class NoteCreateComponent implements OnInit {
  @Input() notes!: Note[] | null;

  readonly form = this.notesFormService.form;

  readonly selectedNote = this.selectNotesService.selectedNote;

  private readonly notesType = NotesTypeName.notes;

  constructor(
    @Inject(NotesFormService) private readonly notesFormService: NotesFormService,
    @Inject(NotesLocalStorageService)
    private readonly notesLocalStorageService: NotesLocalStorageService,
    @Inject(TuiDestroyService) private readonly destroy$: TuiDestroyService,
    @Inject(SelectNotesService) private readonly selectNotesService: SelectNotesService,
  ) {}

  ngOnInit(): void {
    if (this.selectNotesService.selectedNote.getValue()) {
      this.initForm();
    } else {
      this.form.reset();
      const sortedNotesByIds = this.notes?.sort(note => note.id - note.id) ?? null;
      const lastNoteIdsValue = sortedNotesByIds?.at(0)?.id ?? 0;
      this.form.controls.creationDate.setValue(new Date());
      this.form.controls.id.setValue(lastNoteIdsValue + 1);
    }

    combineLatest([
      this.form.controls.title.valueChanges.pipe(startWith(null)),
      this.form.controls.noticeText.valueChanges.pipe(startWith(null)),
      this.form.controls.tags.valueChanges.pipe(startWith(null)),
    ])
      .pipe(
        debounceTime(300),
        tap(([title, noticeText, tags]) => {
          if (title || noticeText || tags) {
            if (!this.notes) {
              const firstNote = [
                {
                  id: this.form.controls.id.value || 0,
                  title: title || '',
                  noticeText: noticeText || '',
                  creationDate: new Date(),
                  tags: tags || [],
                },
              ];

              this.notesLocalStorageService.selectedNotesTypeData.next(firstNote);
              this.notesLocalStorageService.postNotes(this.notesType);
              return;
            }

            const otherNotes = this.notes.filter(
              notes => notes.id !== this.form.controls.id.value,
            );
            const currentNotes = [this.form.value, ...otherNotes];

            this.selectedNote.next(this.form.value as Note);
            this.notesLocalStorageService.selectedNotesTypeData.next(
              currentNotes as Note[],
            );
            this.notesLocalStorageService.postNotes(
              this.notesType,
              currentNotes as Note[],
            );
          }
        }),
        takeUntil(this.destroy$),
      )
      .subscribe();
  }

  initForm() {
    const formData = {...this.selectNotesService.selectedNote.getValue()};
    this.form.patchValue(formData);
  }

  onRemoveTagByName(tagName: string): void {
    const currentTags = this.form.controls.tags.value;

    if (Array.isArray(currentTags)) {
      const afterDeleteTagsData = currentTags.filter(tag => tag !== tagName);
      this.form.controls.tags.setValue(afterDeleteTagsData);
    }
  }
}
