import {Component, Inject} from '@angular/core';
import {
  NotesTypeName,
  SelectNotesService,
  TypographyComponent,
} from '../../../../../shared';
import {AsyncPipe, NgClass} from '@angular/common';
import {TuiButtonModule} from '@taiga-ui/core';
import {TuiTabsModule} from '@taiga-ui/kit';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [NgClass, AsyncPipe, TypographyComponent, TuiButtonModule, TuiTabsModule],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.scss',
})
export class TabsComponent {
  readonly selectedTabName$ = this.selectNotesService.selectedNotesType$;
  readonly selectedTabName = this.selectNotesService.selectedNotesType;

  readonly selectedNote = this.selectNotesService.selectedNote;
  readonly selectedNotification = this.selectNotesService.selectedNotification;

  readonly editMode = this.selectNotesService.editMode;
  readonly createState = this.selectNotesService.isCreateState;

  tabName = NotesTypeName;

  constructor(
    @Inject(SelectNotesService) private readonly selectNotesService: SelectNotesService,
  ) {}

  onSelectNotesType(type: NotesTypeName): void {
    this.editMode.next(false);
    this.createState.next(false);
    this.selectedNote.next(null);
    this.selectedNotification.next(null);
    this.selectedTabName.next(type);
  }
}
