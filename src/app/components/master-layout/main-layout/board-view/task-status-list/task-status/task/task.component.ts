import {Component, Input} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {CommonModule} from "@angular/common";
import {getCategoryColor} from "../../../../../../../models/enums/category";
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {TaskStatus} from "../../../../../../../models/enums/task-status";
import {PriorityProperties} from "../../../../../../../models/enums/priority";
import {MatOption} from "@angular/material/autocomplete";
import {MatSuffix} from "@angular/material/form-field";
import {MatTooltipModule} from '@angular/material/tooltip';
import {ProgressBarModule} from 'primeng/progressbar';
import {ToastModule} from 'primeng/toast';
import {AvatarModule} from 'primeng/avatar';
import {AvatarGroupModule} from 'primeng/avatargroup';
import {Task} from '../../../../../../../models/entity/task';
import {Subtask} from "../../../../../../../models/entity/subtask";
import {MatDialog} from "@angular/material/dialog";
import {TaskService} from "../../../../../../../services/taskService/task.service";
import {TaskDialogService} from "../../../../../../../services/taskService/task-dialog.service";
import {getInitials} from "../../../../../../../utils/helpers";

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [MatCardModule, ToastModule, ProgressBarModule, AvatarModule, AvatarGroupModule, MatTooltipModule, CommonModule, MatButtonModule, MatMenuModule, MatIconModule, MatOption, MatSuffix],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent {
  @Input() task!: Task;
  protected readonly getInitials = getInitials;
  protected readonly getCategoryColor = getCategoryColor;
  protected readonly PriorityProperties = PriorityProperties;
  taskStatuses = Object.keys(TaskStatus)
    .filter(key => isNaN(Number(TaskStatus[key as keyof typeof TaskStatus])))
    .map(key => ({key: key as keyof typeof TaskStatus, value: TaskStatus[key as keyof typeof TaskStatus]}));

  constructor(private taskService: TaskService, private taskDialogService: TaskDialogService, private dialog: MatDialog) {}

  public countCompletedSubtasks(subtasks: Subtask[]): number {
    return this.taskService.countCompletedSubtasks(subtasks);
  }

  public calcProgressBarValue(subtasks: Subtask[]) {
    return this.taskService.calcProgressBarValue(subtasks);
  }

  public editTaskDialog(task: Task) {
    this.taskDialogService.editTaskDialog(task);
  }

  public deleteTaskDialog(taskId: number) {
    this.taskDialogService.deleteTaskDialog(taskId);
  }
}
