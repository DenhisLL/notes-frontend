import {Component, Inject} from '@angular/core';
import {
  DummyViewComponent,
  NotesLocalStorageService,
  NotesTypeName,
  SelectNotesService,
} from '../../../shared';
import {
  NotificationCreateComponent,
  NotificationPreviewCompositionComponent,
  NotificationViewComponent,
} from './components';
import {CommonModule} from '@angular/common';
import {Notification} from './interfaces';
import {TuiDestroyService, TuiLetModule} from '@taiga-ui/cdk';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [
    CommonModule,
    TuiLetModule,
    NotificationViewComponent,
    NotificationPreviewCompositionComponent,
    NotificationCreateComponent,
    DummyViewComponent,
  ],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss',
  providers: [TuiDestroyService],
})
export class NotificationsComponent {
  private readonly notesType = NotesTypeName.notifications;

  readonly notifications = this.notesLocalStorageService.selectedNotificationsTypeData;
  readonly notifications$ = this.notesLocalStorageService.selectedNotificationsTypeData$;

  readonly selectedNotification = this.selectNotesService.selectedNotification;
  readonly selectedNotification$ = this.selectNotesService.selectedNotification$;

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

  onSelectNotification(id: number) {
    const notifications = this.notifications.getValue();
    const selectedNotification = notifications?.find(
      notification => notification.id === id,
    );

    this.editMode.next(false);
    this.selectedNotification.next(selectedNotification as Notification);
  }
}
