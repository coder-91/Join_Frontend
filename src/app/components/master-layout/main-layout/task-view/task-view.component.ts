import { CommonModule } from '@angular/common';
import {Component, Inject, OnDestroy, OnInit, Optional, ViewChild} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatError, MatFormField, MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatOption, provideNativeDateAdapter} from '@angular/material/core';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {TitleCasePipe} from "@angular/common";
import {MatSelect} from "@angular/material/select";
import {MatIcon} from "@angular/material/icon";
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {ChipFieldComponent} from "../../../shared/form-fields/chip-field/chip-field.component";
import {User} from "../../../../models/entity/user";
import {UserService} from "../../../../services/userService/user.service";
import {Subscription} from "rxjs";
import {CATEGORIES, PRIORITIES, TASK_STATUSES} from "../../../../services/taskService/task-constants";
import { Task } from '../../../../models/entity/task';
import {TaskService} from "../../../../services/taskService/task.service";

@Component({
  selector: 'app-task-view',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCheckbox,
    MatError,
    MatFormField,
    MatLabel,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonToggleModule,
    TitleCasePipe,
    MatSelect,
    MatOption,
    MatIcon,
    MatRadioGroup,
    MatRadioButton,
    ChipFieldComponent,
    MatDialogModule,
  ],
  templateUrl: './task-view.component.html',
  styleUrl: './task-view.component.scss'
})
export class TaskViewComponent implements OnInit, OnDestroy {
  protected readonly PRIORITIES = PRIORITIES;
  protected readonly CATEGORIES = CATEGORIES;
  protected readonly Object = Object;
  taskForm!: FormGroup;
  minDate!: Date;
  keywords!: string[];
  fromPopup = false;
  @ViewChild(ChipFieldComponent) chipFieldComponent!: ChipFieldComponent;
  users!: User[];
  usersSubscription!: Subscription;
  userCompareWithFn = (user: User, value: User) => user?.id == value?.id
  constructor(private fb: FormBuilder, @Optional() private dialogRef: MatDialogRef<TaskViewComponent>, private taskService: TaskService, private userService:UserService, @Optional() @Inject(MAT_DIALOG_DATA) public data: { fromPopup: boolean, task: Task }) {}

  ngOnInit() {
    this.minDate = new Date();
    this.fromPopup = !!this.data?.fromPopup;
    this.keywords = [];

    this.taskForm = this.fb.group({
        id: this.data?.task?.id,
        title: new FormControl('', [Validators.required]),
        dueTo: new FormControl('', [Validators.required]),
        description: new FormControl(''),
        created: this.data?.task?.created,
        updated: this.data?.task?.updated,
        priority: new FormControl(Object.values(PRIORITIES)[0], [Validators.required]),
        category: new FormControl([]),
        users: new FormControl([]),
        subtasks: new FormControl([]),
        status: Object.values(TASK_STATUSES)[0],
      }
    );
    this.usersSubscription = this.userService.users$.subscribe(users => {
      this.users = users;
    })

    if (this.data?.task) {
      this.taskForm.patchValue({
        id: this.data.task?.id,
        title: this.data.task.title,
        dueTo: this.data.task.dueTo,
        description: this.data.task.description,
        created: this.data?.task.created,
        updated: this.data?.task.updated,
        priority: this.data.task.priority,
        category: this.data.task.category,
        users: this.data.task.users,
        subtasks: this.data.task.subtasks,
        status: this.data?.task.status
      });
    }
  }

  ngOnDestroy() {
    this.usersSubscription.unsubscribe();
  }

  public get subtasksFormControl () {
    return this.taskForm.get("subtasks") as FormControl;
  }

  public onSubmit() {
    if (this.data?.task) {
      this.taskService.taskDetails = this.taskForm.getRawValue();
      this.onUpdateTask();
    } else {
      this.onCreateTask();
    }
    this.onReset();
  }

  public onCreateTask() {
    if(this.fromPopup) {
      this.dialogRef.close(this.taskForm.getRawValue());
    } else {
      this.taskService.createTask(this.taskForm.getRawValue(), Object.values(TASK_STATUSES)[0])
    }
  }

  public onUpdateTask() {
    if(this.fromPopup) {
      this.dialogRef.close(this.taskForm.getRawValue());
    } else {
      this.taskService.updateTask(this.data?.task)
    }
  }

  public onReset() {
    this.taskForm.reset();
    this.chipFieldComponent.keywords=[];
    this.subtasksFormControl.reset();
    this.subtasksFormControl.markAsPristine();
    this.subtasksFormControl.markAsUntouched()
  }
}
