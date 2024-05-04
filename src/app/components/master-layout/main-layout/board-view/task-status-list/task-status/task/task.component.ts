import {Component, Input} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {CommonModule} from "@angular/common";
import {Category, getCategoryColor} from "../../../../../../../models/enums/category";
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

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [MatCardModule, ToastModule, ProgressBarModule, AvatarModule, AvatarGroupModule, MatTooltipModule, CommonModule, MatButtonModule, MatMenuModule, MatIconModule, MatOption, MatSuffix],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent {
  @Input() task!: Task;
  protected readonly getCategoryColor = getCategoryColor;
  protected readonly Category = Category;
  protected readonly PriorityProperties = PriorityProperties;
  taskStatuses = Object.keys(TaskStatus)
    .filter(key => isNaN(Number(TaskStatus[key as keyof typeof TaskStatus])))
    .map(key => ({ key: key as keyof typeof TaskStatus, value: TaskStatus[key as keyof typeof TaskStatus] }));
}
