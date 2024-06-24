import {Component, Input} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {CommonModule} from "@angular/common";
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatOption} from "@angular/material/autocomplete";
import {MatSuffix} from "@angular/material/form-field";
import {MatTooltipModule} from '@angular/material/tooltip';
import {Task} from '../../../../../../../models/entity/task';
import {Subtask} from "../../../../../../../models/entity/subtask";
import {TaskService} from "../../../../../../../services/taskService/task.service";
import {TaskDialogService} from "../../../../../../../services/taskService/task-dialog.service";
import {getInitials} from "../../../../../../../utils/helpers";
import {TASK_STATUSES} from "../../../../../../../services/taskService/task-constants";
import {TaskStatus} from "../../../../../../../models/interfaces/task-status";

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [MatCardModule, MatTooltipModule, CommonModule, MatButtonModule, MatMenuModule, MatIconModule, MatOption, MatSuffix],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent {
  protected readonly TASK_STATUSES = TASK_STATUSES;
  @Input() task!: Task;
  @Input() taskStatus!:TaskStatus;
  protected readonly Object = Object;
  protected readonly getInitials = getInitials;

  constructor(public taskService: TaskService, private taskDialogService: TaskDialogService) {}

  public countCompletedSubtasks(subtasks: Subtask[]): number {
    return this.taskService.countCompletedSubtasks(subtasks);
  }

  public subtasksProgressInPercent(subtasks: Subtask[]) {
    return this.taskService.subtasksProgressInPercent(subtasks);
  }

  public updateTaskDialog(task: Task) {
    this.taskDialogService.updateTaskDialog(task);
  }

  public deleteTaskDialog(taskId: number) {
    this.taskDialogService.deleteTaskDialog(taskId);
  }

  public updateTask(task: Task, newStatus: TaskStatus) {
    this.taskService.updateTask(task, newStatus.key);
  }

  public showTaskDetailsDialog(task: Task) {
    this.taskDialogService.showTaskDetailsDialog(task);
  }

  public stopPropagation(event: MouseEvent) {
    event.stopPropagation();
  }
}
