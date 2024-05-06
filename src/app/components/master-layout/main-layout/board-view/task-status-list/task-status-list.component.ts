import { Component } from '@angular/core';
import {MatOption} from "@angular/material/autocomplete";
import {TaskStatusComponent} from "./task-status/task-status.component";
import {TaskComponent} from "./task-status/task/task.component";
import {TaskService} from "../../../../../services/taskService/task.service";

@Component({
  selector: 'app-task-status-list',
  standalone: true,
  imports: [
    MatOption,
    TaskStatusComponent,
    TaskComponent,
  ],
  templateUrl: './task-status-list.component.html',
  styleUrl: './task-status-list.component.scss'
})
export class TaskStatusListComponent {
  protected readonly Object = Object;
  constructor(public taskService: TaskService) {}
}
