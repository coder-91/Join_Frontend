import {Component, Input} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {TaskComponent} from "./task/task.component";
import {TaskStatus} from "../../../../../../models/enums/task-status";
import { Task } from '../../../../../../models/entity/task';
import {Priority} from "../../../../../../models/enums/priority";
import {Category} from "../../../../../../models/enums/category";

@Component({
  selector: 'app-task-status',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, TaskComponent],
  templateUrl: './task-status.component.html',
  styleUrl: './task-status.component.scss'
})
export class TaskStatusComponent {
  @Input() taskStatus!:any;
  protected readonly TaskStatus = TaskStatus;

  tasks: Task[] = [
    {
      id: 1,
      title: 'Überprüfen der Projektanforderungen 1',
      description: 'Überprüfen Sie die Anforderungen des Projekts, um sicherzustellen, dass sie vollständig sind.',
      dueTo: new Date('2024-05-10'),
      created: new Date('2024-04-20'),
      updated: new Date('2024-04-25'),
      priority: Priority.LOW,
      category: Category.USER_STORY,
      subtasks: [{id:1, taskId:1, description:'Subtask 1', isDone: false}, {id:2, taskId:2, description:'Subtask 2', isDone: false}],
      contacts: [
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
          avatarColor: '#ffa000'
        },
        {
          id: 3,
          email: 'alice.smith@example.com',
          name: 'Alice Smith',
          phoneNumber: '+1122334455',
          avatarColor: '#ffca70'
        },
      ],
      taskStatus: TaskStatus.TO_DO,
    },

    {
      id: 2,
      title: 'Überprüfen der Projektanforderungen 2',
      description: 'Überprüfen Sie die Anforderungen des Projekts, um sicherzustellen, dass sie vollständig sind.',
      dueTo: new Date('2024-05-10'),
      created: new Date('2024-04-20'),
      updated: new Date('2024-04-25'),
      priority: Priority.MEDIUM,
      category: Category.USER_STORY,
      subtasks: [{id:1, taskId:1, description:'Subtask 1', isDone: false}],
      contacts: [
        {
          id: 1,
          email: 'john.doe@example.com',
          name: 'John Doe',
          phoneNumber: '+1234567890',
          avatarColor: '#00f100'
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
          avatarColor: '#ff00ff'
        },
      ],
      taskStatus: TaskStatus.IN_PROGRESS,
    },

    {
      id: 3,
      title: 'Überprüfen der Projektanforderungen 3',
      description: 'Überprüfen Sie die Anforderungen des Projekts, um sicherzustellen, dass sie vollständig sind.',
      dueTo: new Date('2024-05-10'),
      created: new Date('2024-04-20'),
      updated: new Date('2024-04-25'),
      priority: Priority.URGENT,
      category: Category.USER_STORY,
      subtasks: [{id:1, taskId:1, description:'Subtask 1', isDone: false}],
      contacts: [
        {
          id: 1,
          email: 'john.doe@example.com',
          name: 'John Doe',
          phoneNumber: '+1234567890',
          avatarColor: '#1f0ff0'
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
      ],
      taskStatus: TaskStatus.AWAIT_FEEDBACK,
    },

    {
      id: 4,
      title: 'Überprüfen der Projektanforderungen 3',
      description: 'Überprüfen Sie die Anforderungen des Projekts, um sicherzustellen, dass sie vollständig sind.',
      dueTo: new Date('2024-05-10'),
      created: new Date('2024-04-20'),
      updated: new Date('2024-04-25'),
      priority: Priority.LOW,
      category: Category.USER_STORY,
      subtasks: [{id:1, taskId:1, description:'Subtask 1', isDone: false}],
      contacts: [
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
      ],
      taskStatus: TaskStatus.AWAIT_FEEDBACK,
    },

    {
      id: 4,
      title: 'Überprüfen der Projektanforderungen 3',
      description: 'Überprüfen Sie die Anforderungen des Projekts, um sicherzustellen, dass sie vollständig sind.',
      dueTo: new Date('2024-05-10'),
      created: new Date('2024-04-20'),
      updated: new Date('2024-04-25'),
      priority: Priority.LOW,
      category: Category.USER_STORY,
      subtasks: [{id:1, taskId:1, description:'Subtask 1', isDone: false}],
      contacts: [
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
      ],
      taskStatus: TaskStatus.AWAIT_FEEDBACK,
    },

    {
      id: 5,
      title: 'Überprüfen der Projektanforderungen 3',
      description: 'Überprüfen Sie die Anforderungen des Projekts, um sicherzustellen, dass sie vollständig sind.',
      dueTo: new Date('2024-05-10'),
      created: new Date('2024-04-20'),
      updated: new Date('2024-04-25'),
      priority: Priority.LOW,
      category: Category.USER_STORY,
      subtasks: [{id:1, taskId:1, description:'Subtask 1', isDone: false}],
      contacts: [
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
      ],
      taskStatus: TaskStatus.AWAIT_FEEDBACK,
    },

    {
      id: 6,
      title: 'Überprüfen der Projektanforderungen 4',
      description: 'Überprüfen Sie die Anforderungen des Projekts, um sicherzustellen, dass sie vollständig sind.',
      dueTo: new Date('2024-05-10'),
      created: new Date('2024-04-20'),
      updated: new Date('2024-04-25'),
      priority: Priority.LOW,
      category: Category.USER_STORY,
      subtasks: [{id:1, taskId:1, description:'Subtask 1', isDone: false}],
      contacts: [
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
      ],
      taskStatus: TaskStatus.DONE,
    }

  ];

  public filterTasksByStatus(status: TaskStatus): Task[] {
    return this.tasks.filter(task => task.taskStatus === status);
  }

}
