import { CommonModule } from '@angular/common';
import {Component} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatError, MatFormField, MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatOption, provideNativeDateAdapter} from '@angular/material/core';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {Priority, PriorityProperties} from "../../../models/enums/priority";
import {TitleCasePipe} from "@angular/common";
import {MatSelect} from "@angular/material/select";
import {Category} from "../../../models/enums/category";
import {Contact} from "../../../models/entity/contact";
import {MatIcon} from "@angular/material/icon";
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";

@Component({
  selector: 'app-task-view',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    CommonModule,
    MatButton,
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
    MatRadioButton
  ],
  templateUrl: './task-view.component.html',
  styleUrl: './task-view.component.scss'
})
export class TaskViewComponent {
  createTaskForm: FormGroup;
  priorities = Object.keys(Priority)
    .filter(key => isNaN(Number(Priority[key as keyof typeof Priority])))
    .map(key => ({ key: key as keyof typeof Priority, value: Priority[key as keyof typeof Priority] }));
  categories = Object.keys(Category)
    .filter(key => isNaN(Number(Category[key as keyof typeof Category])))
    .map(key => ({ key: key as keyof typeof Category, value: Category[key as keyof typeof Category] }));
  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];

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

  constructor() {
    this.createTaskForm = new FormGroup({
        title: new FormControl('', [Validators.required]),
        dueDate: new FormControl('', [Validators.required]),
        description: new FormControl(''),
        priority: new FormControl('MEDIUM', [Validators.required]),
        category: new FormControl(''),
        assignedTo: new FormControl(''),
        subTasks: new FormControl(''),
      }
    );
  }

  public onSubmit(): void {
  }

  public resetForm() {
    this.createTaskForm.reset();
  }

  protected readonly PriorityProperties = PriorityProperties;
}
