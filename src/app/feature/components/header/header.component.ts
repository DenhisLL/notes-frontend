import {Component} from '@angular/core';
import {TabsComponent, ToolsComponent} from './components';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [TabsComponent, ToolsComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {}
