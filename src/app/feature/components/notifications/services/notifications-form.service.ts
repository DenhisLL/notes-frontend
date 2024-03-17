import {Injectable} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class NotificationsFormService {
  readonly TuiDateControl = new FormControl();
  readonly form = new FormGroup({
    id: new FormControl<number>(0),
    notificationText: new FormControl<string>(''),
    reminderDate: new FormControl<Date | null>(null),
    tags: new FormControl<string[]>([]),
  });
}
