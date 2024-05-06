import { Injectable } from '@angular/core';
import {Task} from "../../models/entity/task";
import {Subtask} from "../../models/entity/subtask";
import {TaskHttpService} from "./task-http.service";
import {Category} from "../../models/interfaces/category";
import {TaskStatus} from "../../models/interfaces/task-status";
import {Priority} from "../../models/interfaces/priority";

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  readonly CATEGORIES: { [key: string]: Category } = {
    TECHNICAL_TASK: {
      key: 'TECHNICAL_TASK',
      value: 'Technical Task',
      color: '#1FD7C1'
    },
    USER_STORY: {
      key: 'USER_STORY',
      value: 'User Story',
      color: '#0038FF'
    }
  };

  readonly TASK_STATUSES: {[key: string]: TaskStatus } = {
    TO_DO: {
      key: 'TO_DO',
      value: 'To Do',
    },
    AWAIT_FEEDBACK: {
      key: 'AWAIT_FEEDBACK',
      value: 'Await Feedback',
    },
    IN_PROGRESS: {
      key: 'IN_PROGRESS',
      value: 'In Progress',
    },
    DONE: {
      key: 'DONE',
      value: 'Done',
    }
  }

  readonly PRIORITIES: {[key: string]: Priority } = {
    URGENT: {
      key: 'URGENT',
      value: 'Urgent',
      color: '#FF7A50',
      icon: 'keyboard_double_arrow_up',
    },
    MEDIUM: {
      key: 'MEDIUM',
      value: 'Urgent',
      color: '#FFA800',
      icon: 'keyboard_double_arrow_right',
    },
    LOW: {
      key: 'LOW',
      value: 'Urgent',
      color: '#7AE229',
      icon: 'keyboard_double_arrow_down',
    }
  }

  tasks: Task[] = [
    {
      id: 1,
      title: 'Überprüfen der Projektanforderungen 1',
      description: 'Überprüfen Sie die Anforderungen des Projekts, um sicherzustellen, dass sie vollständig sind.',
      dueTo: new Date('2024-05-10'),
      created: new Date('2024-04-20'),
      updated: new Date('2024-04-25'),
      priority: this.PRIORITIES['LOW'],
      category: this.CATEGORIES['TECHNICAL_TASK'],
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
      status: this.TASK_STATUSES['TO_DO'],
    },

    {
      id: 2,
      title: 'Überprüfen der Projektanforderungen 2',
      description: 'Überprüfen Sie die Anforderungen des Projekts, um sicherzustellen, dass sie vollständig sind.',
      dueTo: new Date('2024-05-10'),
      created: new Date('2024-04-20'),
      updated: new Date('2024-04-25'),
      priority: this.PRIORITIES['MEDIUM'],
      category: this.CATEGORIES['TECHNICAL_TASK'],
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
      status: this.TASK_STATUSES['IN_PROGRESS'],
    },

    {
      id: 3,
      title: 'Überprüfen der Projektanforderungen 3',
      description: 'Überprüfen Sie die Anforderungen des Projekts, um sicherzustellen, dass sie vollständig sind.',
      dueTo: new Date('2024-05-10'),
      created: new Date('2024-04-20'),
      updated: new Date('2024-04-25'),
      priority: this.PRIORITIES['URGENT'],
      category: this.CATEGORIES['USER_STORY'],
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
      status: this.TASK_STATUSES['AWAIT_FEEDBACK']
    },

    {
      id: 4,
      title: 'Überprüfen der Projektanforderungen 3',
      description: 'Überprüfen Sie die Anforderungen des Projekts, um sicherzustellen, dass sie vollständig sind.',
      dueTo: new Date('2024-05-10'),
      created: new Date('2024-04-20'),
      updated: new Date('2024-04-25'),
      priority: this.PRIORITIES['LOW'],
      category: this.CATEGORIES['USER_STORY'],
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
      status: this.TASK_STATUSES['AWAIT_FEEDBACK']
    },

    {
      id: 4,
      title: 'Überprüfen der Projektanforderungen 3',
      description: 'Überprüfen Sie die Anforderungen des Projekts, um sicherzustellen, dass sie vollständig sind.',
      dueTo: new Date('2024-05-10'),
      created: new Date('2024-04-20'),
      updated: new Date('2024-04-25'),
      priority: this.PRIORITIES['LOW'],
      category: this.CATEGORIES['USER_STORY'],
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
      status: this.TASK_STATUSES['AWAIT_FEEDBACK']
    },

    {
      id: 5,
      title: 'Überprüfen der Projektanforderungen 3',
      description: 'Überprüfen Sie die Anforderungen des Projekts, um sicherzustellen, dass sie vollständig sind.',
      dueTo: new Date('2024-05-10'),
      created: new Date('2024-04-20'),
      updated: new Date('2024-04-25'),
      priority: this.PRIORITIES['LOW'],
      category: this.CATEGORIES['USER_STORY'],
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
      status: this.TASK_STATUSES['AWAIT_FEEDBACK']
    }
  ];

  constructor(private taskHttpService: TaskHttpService) { }

  public createTask(task: Task, status: string) {
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

  public filterTasksByStatus(status: string): Task[] {
    return this.tasks.filter(task => task.status.key === status);
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
