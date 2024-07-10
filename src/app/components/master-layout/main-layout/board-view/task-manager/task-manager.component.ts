import { Component } from '@angular/core';
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatFormField, MatLabel, MatPrefix, MatSuffix} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TaskDialogService} from "../../../../../services/taskService/task-dialog.service";
import {TASK_STATUSES} from "../../../../../services/taskService/task-constants";
import {TaskService} from "../../../../../services/taskService/task.service";

@Component({
  selector: 'app-task-manager',
  standalone: true,
  imports: [
    MatButton,
    MatFormField,
    MatIcon,
    MatIconButton,
    MatInput,
    MatLabel,
    MatPrefix,
    MatSuffix,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './task-manager.component.html',
  styleUrl: './task-manager.component.scss'
})
export class TaskManagerComponent {
  searchValue:string="";

  constructor(public taskDialogService: TaskDialogService, private taskService: TaskService) {}

  public onKeyUp(): void {
    this.taskService.filterTasks(this.searchValue);
  }

  public onResetFilter() {
    this.searchValue="";
    this.onKeyUp();
  }

  public onCreateTask() {
    this.taskDialogService.createTaskDialog(Object.values(TASK_STATUSES)[0]);
  }
}
