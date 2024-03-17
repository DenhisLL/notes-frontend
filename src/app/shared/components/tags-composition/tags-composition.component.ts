import {AsyncPipe, NgClass, NgFor, NgIf} from '@angular/common';
import {Component, EventEmitter, Inject, Input, Output} from '@angular/core';
import {TypographyComponent} from '../typography';
import {TuiScrollbarModule, TuiSvgModule} from '@taiga-ui/core';
import {SelectNotesService} from '../../services';

@Component({
  selector: 'app-tags-composition',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    AsyncPipe,
    TypographyComponent,
    TuiSvgModule,
    TuiScrollbarModule,
  ],
  templateUrl: './tags-composition.component.html',
  styleUrl: './tags-composition.component.scss',
})
export class TagsCompositionComponent {
  @Input() tags!: string[] | null;
  @Input() isPreview!: boolean;
  @Output() removedTagName: EventEmitter<string> = new EventEmitter();

  readonly editMode$ = this.selectNotesService.editMode$;

  constructor(
    @Inject(SelectNotesService) private readonly selectNotesService: SelectNotesService,
  ) {}

  onRemove(tagName: string): void {
    this.removedTagName.emit(tagName);
  }
}
