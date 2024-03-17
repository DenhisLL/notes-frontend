import {Component, Inject} from '@angular/core';
import {TuiSvgModule} from '@taiga-ui/core';
import {
  NotesLocalStorageService,
  NotesTypeName,
  SelectNotesService,
} from '../../../../../shared';
import {AsyncPipe, NgClass} from '@angular/common';

@Component({
  selector: 'app-tools',
  standalone: true,
  imports: [TuiSvgModule, AsyncPipe, NgClass],
  templateUrl: './tools.component.html',
  styleUrl: './tools.component.scss',
})
export class ToolsComponent {
  readonly notesType = this.selectNotesService.selectedNotesType;
  readonly selectedNote$ = this.selectNotesService.selectedNote$;
  readonly selectedNotification$ = this.selectNotesService.selectedNotification$;

  readonly isCreateState = this.selectNotesService.isCreateState;
  readonly isCreateState$ = this.selectNotesService.isCreateState$;

  constructor(
    @Inject(SelectNotesService) private readonly selectNotesService: SelectNotesService,
    @Inject(NotesLocalStorageService)
    private readonly notesLocalStorageService: NotesLocalStorageService,
  ) {}

  onEdit(): void {
    const tab = this.selectNotesService.editMode.getValue();
    this.selectNotesService.editMode.next(!tab);
  }

  onCreate(): void {
    const editModeTab = this.selectNotesService.editMode.getValue();
    const createStateTab = this.isCreateState.getValue();

    this.selectNotesService.selectedNotification.next(null);
    this.selectNotesService.selectedNote.next(null);
    this.isCreateState.next(!createStateTab);
    this.selectNotesService.editMode.next(!editModeTab);
  }

  onDelete(): void {
    const currentNotesType = this.notesType.getValue();
    this.notesLocalStorageService.deleteNotes(currentNotesType);
  }
}
