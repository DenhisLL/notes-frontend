import {Component, Input} from '@angular/core';
import {TagsCompositionComponent, TypographyComponent} from '../../../../../shared';
import {DatePipe, NgClass, NgFor, NgIf, registerLocaleData} from '@angular/common';
import ru from '@angular/common/locales/ru';

registerLocaleData(ru);

@Component({
  selector: 'app-notification-preview',
  standalone: true,
  imports: [
    TypographyComponent,
    DatePipe,
    NgClass,
    NgIf,
    NgFor,
    TagsCompositionComponent,
  ],
  templateUrl: './notification-preview.component.html',
  styleUrl: './notification-preview.component.scss',
})
export class NotificationPreviewComponent {
  @Input()
  notificationText!: string;
  @Input()
  reminderDate!: Date;
  @Input()
  tags!: string[];
  @Input() isSelected!: boolean | null;
}
