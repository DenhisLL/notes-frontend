import {Injectable} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class NotesFormService {
  readonly form = new FormGroup({
    id: new FormControl(0),
    title: new FormControl<string>(''),
    noticeText: new FormControl<string>(''),
    creationDate: new FormControl(new Date()),
    tags: new FormControl<string[] | null>(null),
  });
}
