import { Component } from '@angular/core';
import {TaskStatus} from "../../../../../models/enums/task-status";
import {MatOption} from "@angular/material/autocomplete";
import {TaskStatusComponent} from "./task-status/task-status.component";
import {TaskComponent} from "./task-status/task/task.component";

@Component({
  selector: 'app-task-status-list',
  standalone: true,
  imports: [
    MatOption,
    TaskStatusComponent,
    TaskComponent
  ],
  templateUrl: './task-status-list.component.html',
  styleUrl: './task-status-list.component.scss'
})
export class TaskStatusListComponent {
  taskStatuses = Object.keys(TaskStatus)
    .filter(key => isNaN(Number(TaskStatus[key as keyof typeof TaskStatus])))
    .map(key => ({ key: key as keyof typeof TaskStatus, value: TaskStatus[key as keyof typeof TaskStatus] }));
}
