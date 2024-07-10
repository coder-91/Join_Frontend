import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle
} from "@angular/material/dialog";
import {Task} from "../../../../../../../../models/entity/task";
import {ChipFieldComponent} from "../../../../../../../shared/form-fields/chip-field/chip-field.component";
import {MatButton, MatIconButton} from "@angular/material/button";
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerToggle,
  MatDatepickerToggleIcon
} from "@angular/material/datepicker";
import {MatError, MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {PaginatorModule} from "primeng/paginator";
import {TaskDialogService} from "../../../../../../../../services/taskService/task-dialog.service";
import {DatePipe, NgStyle} from "@angular/common";
import {getInitials} from "../../../../../../../../utils/helpers";
import {MatCheckbox, MatCheckboxChange} from "@angular/material/checkbox";
import {Subtask} from "../../../../../../../../models/entity/subtask";
import {Subscription} from "rxjs";
import {TaskService} from "../../../../../../../../services/taskService/task.service";

@Component({
  selector: 'app-task-details',
  standalone: true,
  imports: [
    ChipFieldComponent,
    MatButton,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDatepickerToggleIcon,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatError,
    MatFormField,
    MatIcon,
    MatIconButton,
    MatInput,
    MatLabel,
    MatOption,
    MatSelect,
    MatSuffix,
    PaginatorModule,
    ReactiveFormsModule,
    DatePipe,
    MatCheckbox,
    NgStyle
  ],
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.scss'
})

export class TaskDetailsComponent implements OnInit, OnDestroy {
  protected readonly getInitials = getInitials;
  taskDetailsSubscription!: Subscription;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { fromPopup: boolean, task: Task }, private taskDialogService: TaskDialogService, private taskService: TaskService) {
    this.taskService.taskDetails = this.data.task;
  }

  ngOnInit() {
    this.taskDetailsSubscription = this.taskService.taskDetails$.subscribe(task => {
      this.data.task = task;
    })
  }

  ngOnDestroy() {
    this.taskDetailsSubscription.unsubscribe();
  }

  onDelete(id: number) {
    this.taskDialogService.deleteTaskDialog(id);
  }

  public onUpdate(task: Task) {
    this.taskDialogService.updateTaskDialog(task);
  }

  public onUpdateTask(task: Task, subtask: Subtask, event: MatCheckboxChange) {
    subtask.isDone = event.checked;
    this.taskService.updateTask(task);
  }
}
