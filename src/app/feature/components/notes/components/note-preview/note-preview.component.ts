import {CommonModule} from '@angular/common';
import {Component, Input} from '@angular/core';
import {TagsCompositionComponent, TypographyComponent} from '../../../../../shared';

@Component({
  selector: 'app-note-preview',
  standalone: true,
  imports: [CommonModule, TypographyComponent, TagsCompositionComponent],
  templateUrl: './note-preview.component.html',
  styleUrl: './note-preview.component.scss',
})
export class NotePreviewComponent {
  @Input()
  title!: string;
  @Input()
  creationDate!: Date;
  @Input()
  noticeText!: string;
  @Input()
  tags!: string[];
  @Input() isSelected!: boolean | null;
}
