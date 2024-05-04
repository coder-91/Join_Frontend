import { Component } from '@angular/core';
import {TaskStatusListComponent} from "./task-status-list/task-status-list.component";
import {TaskManagerComponent} from "./task-manager/task-manager.component";
@Component({
  selector: 'app-board-view',
  standalone: true,
  imports: [
    TaskStatusListComponent,
    TaskManagerComponent
  ],
  templateUrl: './board-view.component.html',
  styleUrl: './board-view.component.scss'
})
export class BoardViewComponent {}
