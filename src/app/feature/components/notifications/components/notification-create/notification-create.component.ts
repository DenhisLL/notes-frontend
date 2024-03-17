import {Component, Inject, Input, OnDestroy} from '@angular/core';
import {Notification} from '../../interfaces';
import {NotificationsFormService} from '../../services';
import {
  NotesLocalStorageService,
  NotesTypeName,
  SelectNotesService,
  TagsCompositionComponent,
  TagsSelectComponent,
} from '../../../../../shared';
import {
  TUI_DATE_FORMAT,
  TUI_DATE_SEPARATOR,
  TuiDay,
  TuiDestroyService,
  TuiTime,
} from '@taiga-ui/cdk';
import {combineLatest, debounceTime, startWith, takeUntil, tap} from 'rxjs';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TuiInputDateTimeModule, TuiTextareaModule} from '@taiga-ui/kit';
import {
  TuiDialogModule,
  TuiDropdownModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-notification-create',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    TuiInputDateTimeModule,
    TuiDialogModule,
    TuiDropdownModule,
    CommonModule,
    TuiTextareaModule,
    TuiTextfieldControllerModule,
    TagsSelectComponent,
    TagsCompositionComponent,
  ],
  templateUrl: './notification-create.component.html',
  styleUrl: './notification-create.component.scss',
  providers: [
    TuiDestroyService,
    {provide: TUI_DATE_FORMAT, useValue: 'YMD'},
    {provide: TUI_DATE_SEPARATOR, useValue: '/'},
  ],
})
export class NotificationCreateComponent implements OnDestroy {
  @Input() notifications!: Notification[] | null;

  readonly form = this.notificationsFormService.form;
  readonly dateControl = this.notificationsFormService.TuiDateControl;

  readonly selectedNotification = this.selectNotesService.selectedNotification;

  private readonly notesType = NotesTypeName.notifications;

  constructor(
    @Inject(NotificationsFormService)
    private readonly notificationsFormService: NotificationsFormService,
    @Inject(NotesLocalStorageService)
    private readonly notesLocalStorageService: NotesLocalStorageService,
    @Inject(TuiDestroyService) private readonly destroy$: TuiDestroyService,
    @Inject(SelectNotesService) private readonly selectNotesService: SelectNotesService,
  ) {}

  ngOnInit(): void {
    this.dateControl.valueChanges
      .pipe(
        tap(date => {
          if (Array.isArray(date) && date[1] !== null) {
            const tuiDate = date[0] as TuiDay;
            const tuiTime = date[1] as TuiTime;

            const jsDate = new Date(
              tuiDate.year,
              tuiDate.month,
              tuiDate.day,
              tuiTime.hours,
              tuiTime.minutes,
            );

            this.form.controls.reminderDate.setValue(jsDate);
          }
        }),
        takeUntil(this.destroy$),
      )
      .subscribe();

    if (this.selectedNotification.getValue()) {
      this.initForm();
    } else {
      this.form.reset();
      this.dateControl.reset();
      const sortedNotesByIds =
        this.notifications?.sort(notification => notification.id - notification.id) ??
        null;
      const lastNoteIdsValue = sortedNotesByIds?.at(0)?.id ?? 0;
      this.form.controls.reminderDate.setValue(null);
      this.form.controls.id.setValue(lastNoteIdsValue + 1);
    }

    combineLatest([
      this.form.controls.reminderDate.valueChanges.pipe(startWith(null)),
      this.form.controls.notificationText.valueChanges.pipe(startWith(null)),
      this.form.controls.tags.valueChanges.pipe(startWith(null)),
    ])
      .pipe(
        debounceTime(300),
        tap(([date, text, tags]) => {
          if (date || text || tags) {
            if (!this.notifications) {
              const firstNotification = [
                {
                  id: this.form.controls.id.value || 0,
                  notificationText: text || '',
                  reminderDate: date,
                  tags: tags || [],
                },
              ];

              this.notesLocalStorageService.selectedNotificationsTypeData.next(
                firstNotification as Notification[],
              );
              this.notesLocalStorageService.postNotes(
                this.notesType,
                firstNotification as Notification[],
              );
              return;
            }

            const otherNotification = this.notifications.filter(
              notifications => notifications.id !== this.form.controls.id.value,
            );
            const currentNotification = [this.form.value, ...otherNotification];

            this.selectedNotification.next(this.form.value as Notification);
            this.notesLocalStorageService.selectedNotificationsTypeData.next(
              currentNotification as Notification[],
            );
            this.notesLocalStorageService.postNotes(
              this.notesType,
              currentNotification as Notification[],
            );
          }
        }),
        takeUntil(this.destroy$),
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.form.reset();
    this.dateControl.reset();
  }

  initForm() {
    const formData = {...this.selectNotesService.selectedNotification.getValue()};

    if (formData.id) {
      this.form.controls.id.setValue(formData.id);
    }

    if (formData.notificationText) {
      this.form.controls.notificationText.setValue(formData.notificationText);
    }

    if (formData.reminderDate) {
      const jsDate = new Date(formData.reminderDate);

      const tuiDay = new TuiDay(
        jsDate.getFullYear(),
        jsDate.getMonth(),
        jsDate.getDate(),
      );
      const tuiTime = new TuiTime(jsDate.getHours(), jsDate.getMinutes());

      this.dateControl.setValue([tuiDay, tuiTime]);
    }

    if (formData.tags) {
      this.form.controls.tags.setValue(formData.tags);
    }
  }

  onRemoveTagByName(tagName: string): void {
    const currentTags = this.form.controls.tags.value;

    if (Array.isArray(currentTags)) {
      const afterDeleteTagsData = currentTags.filter(tag => tag !== tagName);
      this.form.controls.tags.setValue(afterDeleteTagsData);
    }
  }
}
