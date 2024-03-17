import {Component, Inject, Input} from '@angular/core';
import {SelectNotesService, TypographyComponent} from '../../../../../shared';
import {Note} from '../../interfaces';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-note-view',
  standalone: true,
  imports: [CommonModule, TypographyComponent],
  templateUrl: './note-view.component.html',
  styleUrl: './note-view.component.scss',
})
export class NoteViewComponent {
  @Input() selectedNote!: Note | null;

  constructor(
    @Inject(SelectNotesService) private readonly selectNotesService: SelectNotesService,
  ) {}

  onEdit(): void {
    const tab = this.selectNotesService.editMode.getValue();
    this.selectNotesService.editMode.next(!tab);
  }
}
