import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NotificationPreviewComponent} from '../notification-preview/notification-preview.component';
import {Notification} from '../../interfaces';
import {CommonModule} from '@angular/common';
import {TuiScrollbarModule} from '@taiga-ui/core';
import {TypographyComponent} from '../../../../../shared';

@Component({
  selector: 'app-notification-preview-composition',
  standalone: true,
  imports: [
    NotificationPreviewComponent,
    CommonModule,
    TuiScrollbarModule,
    TypographyComponent,
  ],
  templateUrl: './notification-preview-composition.component.html',
  styleUrl: './notification-preview-composition.component.scss',
})
export class NotificationPreviewCompositionComponent {
  @Input() notifications!: Notification[] | null;
  @Input() selectedNotification!: Notification | null;
  @Output() selectedNotificationId: EventEmitter<number> = new EventEmitter();
}
