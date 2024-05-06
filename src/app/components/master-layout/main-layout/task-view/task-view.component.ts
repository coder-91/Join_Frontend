import { CommonModule } from '@angular/common';
import {Component, Inject, Optional, ViewChild} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatError, MatFormField, MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatOption, provideNativeDateAdapter} from '@angular/material/core';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {TitleCasePipe} from "@angular/common";
import {MatSelect} from "@angular/material/select";
import {MatIcon} from "@angular/material/icon";
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";
import {MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import {ChipFieldComponent} from "../../../shared/form-fields/chip-field/chip-field.component";
import {Contact} from "../../../../models/entity/contact";
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
export class TaskViewComponent {
  protected readonly Object = Object;
  taskForm: FormGroup;
  keywords: string[];
  fromPopup = false;

  @ViewChild(ChipFieldComponent) chipFieldComponent!: ChipFieldComponent;
  //ToDo
  contacts: Contact[] = [
    {
      id: 1,
      email: 'john.doe@example.com',
      name: 'John Doe',
      phoneNumber: '+1234567890',
      avatarColor: '#ff0000'
    },
    {
      id: 2,
      email: 'jane.doe@example.com',
      name: 'Jane Doe',
      phoneNumber: '+0987654321',
      avatarColor: '#ff0000'
    },
    {
      id: 3,
      email: 'alice.smith@example.com',
      name: 'Alice Smith',
      phoneNumber: '+1122334455',
      avatarColor: '#ff0000'
    },
    {
      id: 4,
      email: 'bob.smith@example.com',
      name: 'Bob Smith',
      phoneNumber: '+6677889900',
      avatarColor: '#ff0000'
    },
    {
      id: 5,
      email: 'emma.jones@example.com',
      name: 'Emma Jones',
      phoneNumber: '+1123456789',
      avatarColor: '#ff0000'
    }
  ];

  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public data: { fromPopup: boolean }, public taskService: TaskService) {
    this.fromPopup = !!data?.fromPopup;
    this.keywords = [];
    this.taskForm = new FormGroup({
        title: new FormControl('', [Validators.required]),
        dueDate: new FormControl('', [Validators.required]),
        description: new FormControl(''),
        priority: new FormControl('MEDIUM', [Validators.required]),
        category: new FormControl(''),
        assignedTo: new FormControl(''),
        subTasks: new FormControl(['']),
      }
    );
  }

  public get subTasksFormControl () {
    return this.taskForm.get("subTasks") as FormControl;
  }

  public onSubmit(): void {
    console.log(this.taskForm);
  }

  public resetForm() {
    this.taskForm.reset();
    this.chipFieldComponent.keywords=[];
  }
}
