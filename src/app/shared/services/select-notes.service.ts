import {Injectable} from '@angular/core';
import {NotesTypeName} from '../interfaces';
import {BehaviorSubject} from 'rxjs';
import {Note, Notification} from '../../feature';

@Injectable({
  providedIn: 'root',
})
export class SelectNotesService {
  readonly selectedNotesType = new BehaviorSubject<NotesTypeName>(NotesTypeName.notes);
  readonly selectedNotesType$ = this.selectedNotesType.asObservable();

  readonly selectedNote = new BehaviorSubject<Note | null>(null);
  readonly selectedNote$ = this.selectedNote.asObservable();

  readonly selectedNotification = new BehaviorSubject<Notification | null>(null);
  readonly selectedNotification$ = this.selectedNotification.asObservable();

  readonly editMode = new BehaviorSubject<boolean>(false);
  readonly editMode$ = this.editMode.asObservable();

  readonly isCreateState = new BehaviorSubject<boolean>(false);
  readonly isCreateState$ = this.isCreateState.asObservable();
}
