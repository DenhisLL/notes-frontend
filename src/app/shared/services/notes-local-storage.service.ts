import {Inject, Injectable} from '@angular/core';
import {Note, NotesFormService, Notification} from '../../feature';
import {BehaviorSubject} from 'rxjs';
import {NotesTypeName} from '../interfaces';
import {SelectNotesService} from './select-notes.service';

@Injectable({
  providedIn: 'root',
})
export class NotesLocalStorageService {
  readonly selectedNotesTypeData = new BehaviorSubject<Note[] | null>(null);
  readonly selectedNotesTypeData$ = this.selectedNotesTypeData.asObservable();

  readonly selectedNotificationsTypeData = new BehaviorSubject<Notification[] | null>(
    null,
  );
  readonly selectedNotificationsTypeData$ =
    this.selectedNotificationsTypeData.asObservable();

  readonly tagsData = new BehaviorSubject<string[] | null>(null);
  readonly tagsData$ = this.tagsData.asObservable();

  constructor(
    @Inject(SelectNotesService) private readonly selectNotesService: SelectNotesService,
  ) {}

  getNotes(notesType: NotesTypeName): void {
    const requestData = localStorage.getItem(notesType);
    if (requestData) {
      const parsedData = JSON.parse(requestData);

      notesType === NotesTypeName.notes
        ? this.selectedNotesTypeData.next(parsedData.notes)
        : this.selectedNotificationsTypeData.next(parsedData.notes);
    }

    return;
  }

  postNotes(
    notesType: NotesTypeName,
    notesData: Note[] | Notification[] | null = null,
  ): void {
    localStorage.setItem(notesType, JSON.stringify({notes: notesData}));
  }

  deleteNotes(notesType: NotesTypeName): void {
    if (notesType === NotesTypeName.notes) {
      const needDeleteNote = this.selectNotesService.selectedNote.getValue();
      const notes = this.selectedNotesTypeData.getValue();
      const currentNotes = notes?.filter(note => needDeleteNote?.id !== note.id);
      const currentNotesType = this.selectNotesService.selectedNotesType.getValue();

      this.postNotes(currentNotesType, currentNotes);
      this.selectNotesService.editMode.next(false);
      this.selectedNotesTypeData.next(currentNotes as Note[]);
      this.selectNotesService.selectedNote.next(null);

      if (Array.isArray(currentNotes) && currentNotes?.length < 1) {
        localStorage.removeItem(currentNotesType);
      }
    } else {
      const needDeleteNotification =
        this.selectNotesService.selectedNotification.getValue();
      const notifications = this.selectedNotificationsTypeData.getValue();
      const currentNotifications = notifications?.filter(
        notifications => needDeleteNotification?.id !== notifications.id,
      );

      this.postNotes(notesType, currentNotifications);
      this.selectNotesService.editMode.next(false);
      this.selectedNotificationsTypeData.next(currentNotifications as Notification[]);
      this.selectNotesService.selectedNotification.next(null);

      if (Array.isArray(currentNotifications) && currentNotifications?.length < 1) {
        localStorage.removeItem(notesType);
      }
    }
  }

  getTags(): void {
    const requestData = localStorage.getItem('tags');
    if (requestData) {
      const parsedData = JSON.parse(requestData);

      this.tagsData.next(parsedData.tags);
    }

    return;
  }

  postTags(tags: string[] | null, key: string = 'tags'): void {
    localStorage.setItem(key, JSON.stringify({tags: tags}));
    this.tagsData.next(tags);
  }
}
