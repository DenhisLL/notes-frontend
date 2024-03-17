import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NotePreviewComponent} from '../note-preview/note-preview.component';
import {CommonModule} from '@angular/common';
import {Note} from '../../interfaces';
import {TuiScrollbarModule} from '@taiga-ui/core';

@Component({
  selector: 'app-note-preview-composition',
  standalone: true,
  imports: [CommonModule, NotePreviewComponent, TuiScrollbarModule],
  templateUrl: './note-preview-composition.component.html',
  styleUrl: './note-preview-composition.component.scss',
})
export class NotePreviewCompositionComponent {
  @Input() notes!: Note[] | null;
  @Input() selectedNote!: Note | null;
  @Output() selectedNoteId: EventEmitter<number> = new EventEmitter();
}
