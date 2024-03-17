import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'typography',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './typography.component.html',
  styleUrls: ['./typography.component.scss'],
})
export class TypographyComponent {
  @Input()
  get variant() {
    return this._variant;
  }
  set variant(value: string) {
    this._variant = `${value}`;
  }
  private _variant = 'p';

  @Input() bold!: string;
  @Input() isFixed!: boolean;
}
