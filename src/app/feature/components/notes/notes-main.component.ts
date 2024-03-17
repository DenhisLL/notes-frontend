import {Component, Inject, OnInit} from '@angular/core';
import {NotePreviewCompositionComponent} from './components';
import {NoteViewComponent} from './components/note-view';
import {NoteCreateComponent} from './components/note-create';
import {CommonModule} from '@angular/common';
import {Note} from './interfaces';
import {
  DummyViewComponent,
  NotesLocalStorageService,
  NotesTypeName,
  SelectNotesService,
} from '../../../shared';
import {TuiLetModule} from '@taiga-ui/cdk';

@Component({
  selector: 'app-notes-main',
  standalone: true,
  imports: [
    CommonModule,
    TuiLetModule,
    NotePreviewCompositionComponent,
    NoteViewComponent,
    NoteCreateComponent,
    DummyViewComponent,
  ],
  templateUrl: './notes-main.component.html',
  styleUrl: './notes-main.component.scss',
})
export class NotesMainComponent implements OnInit {
  private readonly notesType = NotesTypeName.notes;

  readonly notes = this.notesLocalStorageService.selectedNotesTypeData;
  readonly notes$ = this.notesLocalStorageService.selectedNotesTypeData$;

  readonly selectedNote = this.selectNotesService.selectedNote;
  readonly selectedNote$ = this.selectNotesService.selectedNote$;

  readonly editMode = this.selectNotesService.editMode;
  readonly editMode$ = this.selectNotesService.editMode$;

  constructor(
    @Inject(NotesLocalStorageService)
    private readonly notesLocalStorageService: NotesLocalStorageService,
    @Inject(SelectNotesService) private readonly selectNotesService: SelectNotesService,
  ) {}

  ngOnInit(): void {
    this.notesLocalStorageService.getNotes(this.notesType);
  }

  onSelectNote(id: number) {
    const notes = this.notes.getValue();
    const selectedNode = notes?.find(note => note.id === id);

    this.editMode.next(false);
    this.selectedNote.next(selectedNode as Note);
  }
}
