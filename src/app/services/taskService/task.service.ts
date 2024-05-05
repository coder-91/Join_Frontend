import { Injectable } from '@angular/core';
import {Task} from "../../models/entity/task";
import {TaskStatus} from "../../models/enums/task-status";
import {Priority} from "../../models/enums/priority";
import {Category} from "../../models/enums/category";
import {Subtask} from "../../models/entity/subtask";
import {TaskHttpService} from "./task-http.service";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  tasks: Task[] = [
    {
      id: 1,
      title: 'Überprüfen der Projektanforderungen 1',
      description: 'Überprüfen Sie die Anforderungen des Projekts, um sicherzustellen, dass sie vollständig sind.',
      dueTo: new Date('2024-05-10'),
      created: new Date('2024-04-20'),
      updated: new Date('2024-04-25'),
      priority: Priority.LOW,
      category: Category.TECHNICAL_TASK,
      subtasks: [{id:1, taskId:1, description:'Subtask 1', isDone: true}, {id:2, taskId:2, description:'Subtask 2', isDone: false}],
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
      status: TaskStatus.TO_DO,
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
      status: TaskStatus.IN_PROGRESS,
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
      subtasks: [{id:1, taskId:1, description:'Subtask 1', isDone: true}],
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
      status: TaskStatus.AWAIT_FEEDBACK,
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
      subtasks: [],
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
      status: TaskStatus.AWAIT_FEEDBACK,
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
      status: TaskStatus.AWAIT_FEEDBACK,
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
      status: TaskStatus.AWAIT_FEEDBACK,
    }
  ];
  constructor(private taskHttpService: TaskHttpService) { }

  public createTask(task: Task, status: TaskStatus) {
    this.taskHttpService.createTask(task, status);
    console.log("Task created");
  }

  public editTask(task: Task) {
    this.taskHttpService.editTask(task);
    console.log("Task edited");
  }

  public deleteTask(taskId: number) {
    this.taskHttpService.deleteTask(taskId);
    console.log("Task deleted");
  }

  public filterTasksByStatus(status: TaskStatus): Task[] {
    return this.tasks.filter(task => task.status === status);
  }

  countCompletedSubtasks(subtasks: Subtask[]): number {
    let completedSubtasks : number = 0;
    subtasks.forEach(subtask => {
      if(subtask.isDone) {
        completedSubtasks++;
      }
    })
    return completedSubtasks;
  }

  calcProgressBarValue(subtasks: Subtask[]) {
    return this.countCompletedSubtasks(subtasks) / subtasks.length * 100;
  }
}
