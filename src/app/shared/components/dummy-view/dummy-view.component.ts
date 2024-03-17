import {Component} from '@angular/core';
import {TypographyComponent} from '../..';

@Component({
  selector: 'app-dummy-view',
  standalone: true,
  imports: [TypographyComponent],
  templateUrl: './dummy-view.component.html',
  styleUrl: './dummy-view.component.scss',
})
export class DummyViewComponent {}
