import {CommonModule, TitleCasePipe} from '@angular/common';
import {Component, Inject, OnDestroy, OnInit, Optional, ViewChild} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatError, MatFormField, MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup, FormGroupDirective,
  FormsModule,
  ReactiveFormsModule, ValidationErrors, ValidatorFn,
  Validators
} from "@angular/forms";
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatOption, provideNativeDateAdapter} from '@angular/material/core';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatSelect} from "@angular/material/select";
import {MatIcon} from "@angular/material/icon";
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {ChipFieldComponent} from "../../../shared/form-fields/chip-field/chip-field.component";
import {User} from "../../../../models/entity/user";
import {UserService} from "../../../../services/userService/user.service";
import {Subscription} from "rxjs";
import {CATEGORIES, PRIORITIES, TASK_STATUSES} from "../../../../services/taskService/task-constants";
import {Task} from '../../../../models/entity/task';
import {TaskService} from "../../../../services/taskService/task.service";
import {Subtask} from "../../../../models/entity/subtask";
import * as _ from 'lodash';

@Component({
  selector: 'app-task-view',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    CommonModule,
    FormsModule,
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
  fromPopup = false;
  @ViewChild(ChipFieldComponent) chipFieldComponent!: ChipFieldComponent;
  users!: User[];
  usersSubscription!: Subscription;
  subtasks: Subtask[] = [];
  taskDetailsSubscription!: Subscription;
  @ViewChild(FormGroupDirective) formDirective!: FormGroupDirective;
  userCompareWithFn = (user: User, value: User) => user?.id == value?.id


  constructor(private fb: FormBuilder, @Optional() private dialogRef: MatDialogRef<TaskViewComponent>, private taskService: TaskService, private userService:UserService, @Optional() @Inject(MAT_DIALOG_DATA) public data: { fromPopup: boolean, task: Task }) {}

  ngOnInit() {
    this.minDate = new Date();
    this.fromPopup = !!this.data?.fromPopup;

    this.taskForm = this.fb.group({
        id: this.data?.task?.id,
        title: new FormControl('', [Validators.required]),
        dueTo: new FormControl('', [Validators.required, /*this.dateFormatValidator()*/]),
        description: new FormControl(''),
        created: this.data?.task?.created,
        updated: this.data?.task?.updated,
        priority: new FormControl(Object.values(PRIORITIES)[0], [Validators.required]),
        category: new FormControl([], [Validators.required]),
        users: new FormControl([]),
        subtasks: new FormControl(''),
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
        subtasks: [],
        status: this.data?.task.status
      });

      this.subtasks = _.cloneDeep(this.data.task.subtasks);
    }
  }

  ngOnDestroy() {
    this.usersSubscription.unsubscribe();
    if(this.taskDetailsSubscription) {
      this.taskDetailsSubscription.unsubscribe();
    }
  }

  public addSubtask() {
    const subtask = this.taskForm.get('subtasks')?.value;
    if(subtask.trim()) {
      this.subtasks.push({
        taskId: undefined,
        description: subtask,
        isDone: false,
      } as Subtask)

      this.subtasksFormControl.setValue(this.subtasks);
    }
    this.clearSubtask();
  }

  public get subtasksFormControl () {
    return this.taskForm.get("subtasks") as FormControl;
  }

  public onSubmit() {
    if (this.data?.task) {
      const taskRawValue = {
        ...this.taskForm.getRawValue(),
        subtasks: this.subtasks.map((x, i) =>
          x.isEditable ? (this.data.task.subtasks.at(i) ?? x) : x
        ),
      };
      this.taskService.taskDetails = taskRawValue;
      this.onUpdateTask();
    } else {
      this.onCreateTask();
    }
    this.onReset();
  }

  public onCreateTask() {
    const taskRawValue = {
      ...this.taskForm.getRawValue(),
      subtasks: this.subtasks.map((x, i) =>
        x.isEditable ? (this.data.task.subtasks.at(i) ?? x) : x
      ),
    };

    if(this.fromPopup) {
      this.dialogRef.close(taskRawValue);
    } else {
      this.taskService.createTask(taskRawValue, Object.values(TASK_STATUSES)[0])
    }
    this.subtasks=[];
  }

  public onUpdateTask() {
    const taskRawValue = {
      ...this.taskForm.getRawValue(),
      subtasks: this.subtasks
    };
    if(this.fromPopup) {
      this.dialogRef.close(taskRawValue);
    } else {
      this.taskService.updateTask(taskRawValue)
    }

    this.subtasks.forEach(subtask => {
      subtask.isEditable = false;
    });
  }

  public onReset() {
    this.formDirective.resetForm();
    this.subtasks=[];
  }

  public clearSubtask() {
    this.taskForm.patchValue({ subtasks: '' });
  }

  public editSubtask(index: number) {
    this.subtasks[index].isEditable = true;
  }

  public saveSubtask(index: number, subtask:Subtask) {
    this.subtasks[index].isEditable=false;
    this.subtasks[index] = subtask;

  }

  public deleteSubtask(index: number) {
    this.subtasks.splice(index, 1);
    this.data.task.subtasks.splice(index, 1);
  }

  private dateFormatValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;  // If no value, don't validate the format
      }
      const validFormat = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
      return validFormat.test(control.value) ? null : { invalidDateFormat: true };
    };
  }
}
