import {Component} from '@angular/core';
import {MatOption} from "@angular/material/autocomplete";
import {TaskStatusComponent} from "./task-status/task-status.component";
import {TaskComponent} from "./task-status/task/task.component";
import {TASK_STATUSES} from "../../../../../services/taskService/task-constants";
import {CdkDropListGroup,} from '@angular/cdk/drag-drop';
@Component({
  selector: 'app-task-status-list',
  standalone: true,
  imports: [
    MatOption,
    TaskStatusComponent,
    TaskComponent,
    CdkDropListGroup
  ],
  templateUrl: './task-status-list.component.html',
  styleUrl: './task-status-list.component.scss'
})
export class TaskStatusListComponent{
  protected readonly TASK_STATUSES = TASK_STATUSES;
  protected readonly Object = Object;
  protected readonly taskStatusKeys = Object.values(TASK_STATUSES).map(
    (x: any) => x.key
  );
}
