import { Injectable } from '@angular/core';
import {Task} from "../../models/entity/task";
import {Subtask} from "../../models/entity/subtask";
import {TaskHttpService} from "./task-http.service";
import {BehaviorSubject, Observable} from "rxjs";
import {TaskSummary} from "../../models/interfaces/task-summary";
import {CATEGORIES, PRIORITIES, TASK_STATUSES} from "./task-constants";

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private _tasks$: BehaviorSubject<Task[] | undefined> = new BehaviorSubject<Task[] | undefined>(undefined);

  tasksTmp: Task[] = [
    {
      id: 1,
      title: 'Überprüfen der Projektanforderungen 1',
      description: 'Überprüfen Sie die Anforderungen des Projekts, um sicherzustellen, dass sie vollständig sind.',
      dueTo: new Date('2024-05-12'),
      created: new Date('2024-04-20'),
      updated: new Date('2024-04-25'),
      priority: PRIORITIES['URGENT'],
      category: CATEGORIES['TECHNICAL_TASK'],
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
      status: TASK_STATUSES['TO_DO'],
    },

    {
      id: 2,
      title: 'Überprüfen der Projektanforderungen 2',
      description: 'Überprüfen Sie die Anforderungen des Projekts, um sicherzustellen, dass sie vollständig sind.',
      dueTo: new Date('2024-05-11'),
      created: new Date('2024-04-20'),
      updated: new Date('2024-04-25'),
      priority: PRIORITIES['URGENT'],
      category: CATEGORIES['TECHNICAL_TASK'],
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
      status: TASK_STATUSES['IN_PROGRESS'],
    },

    {
      id: 3,
      title: 'Überprüfen der Projektanforderungen 3',
      description: 'Überprüfen Sie die Anforderungen des Projekts, um sicherzustellen, dass sie vollständig sind.',
      dueTo: new Date('2024-05-10'),
      created: new Date('2024-04-20'),
      updated: new Date('2024-04-25'),
      priority: PRIORITIES['URGENT'],
      category: CATEGORIES['USER_STORY'],
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
      status: TASK_STATUSES['AWAIT_FEEDBACK']
    },

    {
      id: 4,
      title: 'Überprüfen der Projektanforderungen 3',
      description: 'Überprüfen Sie die Anforderungen des Projekts, um sicherzustellen, dass sie vollständig sind.',
      dueTo: new Date('2024-05-10'),
      created: new Date('2024-04-20'),
      updated: new Date('2024-04-25'),
      priority: PRIORITIES['LOW'],
      category: CATEGORIES['USER_STORY'],
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
      status: TASK_STATUSES['AWAIT_FEEDBACK']
    },

    {
      id: 4,
      title: 'Überprüfen der Projektanforderungen 3',
      description: 'Überprüfen Sie die Anforderungen des Projekts, um sicherzustellen, dass sie vollständig sind.',
      dueTo: new Date('2024-05-10'),
      created: new Date('2024-04-20'),
      updated: new Date('2024-04-25'),
      priority: PRIORITIES['LOW'],
      category: CATEGORIES['USER_STORY'],
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
      status: TASK_STATUSES['AWAIT_FEEDBACK']
    },

    {
      id: 5,
      title: 'Überprüfen der Projektanforderungen 3',
      description: 'Überprüfen Sie die Anforderungen des Projekts, um sicherzustellen, dass sie vollständig sind.',
      dueTo: new Date('2024-05-10'),
      created: new Date('2024-04-20'),
      updated: new Date('2024-04-25'),
      priority: PRIORITIES['LOW'],
      category: CATEGORIES['USER_STORY'],
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
      status: TASK_STATUSES['AWAIT_FEEDBACK']
    }
  ];

  constructor(private taskHttpService: TaskHttpService) {
    this.fetchTasks()
  }

  // TODO Code korrigieren
  public fetchTasks() {
    this.tasks = this.tasksTmp;
  }

  public get tasks$(): Observable<Task[]> {
    return this._tasks$.asObservable() as Observable<Task[]>;
  }

  public get tasks(): Task[] {
    return this._tasks$.getValue() as Task[];
  }

  // TODO Code korrigieren
  public set tasks(tasks: Task[]) {
    this._tasks$.next(this.tasksTmp);
  }

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

  public getTaskSummary(): TaskSummary {
    let closestUrgentDeadline: Date | null = null;
    const taskSummary: TaskSummary = {
      toDoTasks: 0,
      inProgressTasks: 0,
      awaitingFeedbackTasks: 0,
      doneTasks: 0,
      urgentTasks: 0,
      closestUrgentDeadline: null,
      totalTasks: 0
    };
    this.tasks.forEach(task => {
      if(task.status.key === TASK_STATUSES['TO_DO'].key) {
        taskSummary.toDoTasks++;
      }
      if(task.status.key === TASK_STATUSES['IN_PROGRESS'].key) {
        taskSummary.inProgressTasks++;
      }
      if(task.status.key === TASK_STATUSES['AWAIT_FEEDBACK'].key) {
        taskSummary.awaitingFeedbackTasks++;
      }
      if(task.status.key === TASK_STATUSES['DONE'].key) {
        taskSummary.doneTasks++;
      }
      if(task.priority.key === PRIORITIES['URGENT'].key) {
        taskSummary.urgentTasks++;
        if(!closestUrgentDeadline || closestUrgentDeadline > task.dueTo) {
          closestUrgentDeadline = task.dueTo;
        }

      }
    })
    taskSummary.closestUrgentDeadline = closestUrgentDeadline;
    taskSummary.totalTasks = this.tasks.length;
    return taskSummary;
  }

  public countCompletedSubtasks(subtasks: Subtask[]): number {
    let completedSubtasks : number = 0;
    subtasks.forEach(subtask => {
      if(subtask.isDone) {
        completedSubtasks++;
      }
    })
    return completedSubtasks;
  }

  public calcProgressBarValue(subtasks: Subtask[]) {
    return this.countCompletedSubtasks(subtasks) / subtasks.length * 100;
  }
}
