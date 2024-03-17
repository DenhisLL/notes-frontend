import {Component, Inject} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {TuiRootModule} from '@taiga-ui/core';
import {HeaderComponent, NotesMainComponent, NotificationsComponent} from './feature';
import {NotesTypeName, SelectNotesService} from './shared';
import {AsyncPipe, CommonModule, NgIf} from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NotesMainComponent,
    TuiRootModule,
    HeaderComponent,
    NgIf,
    AsyncPipe,
    NotificationsComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'notes-frontend';
  tabName = NotesTypeName;

  readonly selectedTabName$ = this.selectNotesService.selectedNotesType$;

  constructor(
    @Inject(SelectNotesService) private readonly selectNotesService: SelectNotesService,
  ) {}
}
