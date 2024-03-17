import {Component, Input} from '@angular/core';
import {Notification} from '../../interfaces';
import {TypographyComponent} from '../../../../../shared';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-notification-view',
  standalone: true,
  imports: [TypographyComponent, DatePipe],
  templateUrl: './notification-view.component.html',
  styleUrl: './notification-view.component.scss',
})
export class NotificationViewComponent {
  @Input() selectedNotification!: Notification | null;
}
