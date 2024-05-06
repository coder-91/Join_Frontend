import {Component, Input} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {TaskComponent} from "./task/task.component";
import {TaskStatus} from "../../../../../../models/interfaces/task-status";
import {Task} from '../../../../../../models/entity/task';
import {MatSuffix} from "@angular/material/form-field";
import {TaskService} from "../../../../../../services/taskService/task.service";
import {TaskDialogService} from "../../../../../../services/taskService/task-dialog.service";

@Component({
  selector: 'app-task-status',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, TaskComponent, MatSuffix],
  templateUrl: './task-status.component.html',
  styleUrl: './task-status.component.scss'
})
export class TaskStatusComponent {
  @Input() taskStatus!:TaskStatus;
  tasks: Task[];

  constructor(public taskService: TaskService, private taskDialogService:TaskDialogService) {
    this.tasks= this.taskService.tasks;
  }

  public filterTasksByStatus(status: string): Task[] {
    return this.taskService.filterTasksByStatus(status);
  }

  public createTaskDialog(taskStatus: string) {
    this.taskDialogService.createTaskDialog(taskStatus);
  }
}
