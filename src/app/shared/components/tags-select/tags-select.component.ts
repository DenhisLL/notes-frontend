import {CommonModule, NgClass} from '@angular/common';
import {Component, Inject, Input, OnInit} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {TuiDestroyService, TuiLetModule} from '@taiga-ui/cdk';
import {
  TuiDataListModule,
  TuiDropdownModule,
  TuiSvgModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import {TuiComboBoxModule, TuiDataListWrapperModule, TuiInputModule} from '@taiga-ui/kit';
import {
  BehaviorSubject,
  debounceTime,
  distinctUntilChanged,
  map,
  share,
  startWith,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';
import {NotesLocalStorageService} from '../../services';

@Component({
  selector: 'app-tags-select',
  standalone: true,
  imports: [
    TuiComboBoxModule,
    TuiDataListWrapperModule,
    ReactiveFormsModule,
    TuiLetModule,
    TuiTextfieldControllerModule,
    TuiDropdownModule,
    FormsModule,
    CommonModule,
    TuiDataListModule,
    TuiInputModule,
    TuiTextfieldControllerModule,
    TuiSvgModule,
    NgClass,
  ],
  templateUrl: './tags-select.component.html',
  styleUrl: './tags-select.component.scss',
  providers: [TuiDestroyService],
})
export class TagsSelectComponent implements OnInit {
  @Input() control!: FormControl<string[] | null>;

  readonly newTag = new FormControl<string>('', [
    Validators.maxLength(20),
    Validators.required,
  ]);
  readonly tagControl = new FormControl<string>('');

  readonly tagsData = this.notesLocalStorageService.tagsData;
  readonly tagsData$ = this.notesLocalStorageService.tagsData$;

  readonly searchTags$ = new BehaviorSubject<string | null>('');

  readonly addTagState$ = new BehaviorSubject<boolean>(false);

  readonly tags$ = this.searchTags$.pipe(
    map(value => (typeof value === 'string' ? value.trim() : '')),
    debounceTime(300),
    switchMap(text =>
      this.tagsData$.pipe(
        map(data => {
          if (Array.isArray(data)) {
            const currentTags = this.control.value;

            if (Array.isArray(currentTags)) {
              const withoutSelectedData = data.filter(
                item => !currentTags.includes(item),
              );

              return withoutSelectedData.filter(item => item.includes(text));
            }

            return data.filter(item => item.includes(text));
          }

          return data || [];
        }),
        startWith(null),
      ),
    ),
    startWith([]),
    share(),
  );

  constructor(
    @Inject(TuiDestroyService) private readonly destroy$: TuiDestroyService,
    @Inject(NotesLocalStorageService)
    private readonly notesLocalStorageService: NotesLocalStorageService,
  ) {}

  ngOnInit(): void {
    this.notesLocalStorageService.getTags();
    this.initListeners();
  }

  onSearchValueChange = (
    searchQuery: string | null,
    searchSubject: BehaviorSubject<string | null>,
  ) => searchSubject.next(searchQuery);

  initListeners(): void {
    this.tagControl.valueChanges
      .pipe(
        tap(tag => {
          if (tag) {
            const currentTags = this.control.value;

            this.searchTags$.next('');

            if (Array.isArray(currentTags)) {
              this.control.setValue([...currentTags, tag]);
              this.tagControl.setValue('');
              return;
            }

            this.tagControl.setValue('');
            this.control.setValue([tag]);
          }
        }),
        takeUntil(this.destroy$),
      )
      .subscribe();

    this.control.valueChanges.pipe().subscribe(val => {
      if (val) {
        const value = this.searchTags$.getValue();
        this.searchTags$.next(value);
      }
    });
  }

  onToggleState(): void {
    const currentState = this.addTagState$.getValue();
    this.addTagState$.next(!currentState);
  }

  addNewTag(): void {
    if (this.newTag.value) {
      const currentTagsData = this.tagsData.getValue();

      if (Array.isArray(currentTagsData)) {
        if (currentTagsData.includes(this.newTag.value)) {
          alert('Кажется, такой тег уже существует');
          this.newTag.setValue('');
          this.newTag.markAsTouched();
          this.newTag.updateValueAndValidity();
          return;
        }

        this.notesLocalStorageService.postTags([...currentTagsData, this.newTag.value]);
        this.newTag.setValue('');
        return;
      }

      this.notesLocalStorageService.postTags([this.newTag.value]);
      this.newTag.setValue('');
    }
  }
}
