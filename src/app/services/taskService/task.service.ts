import {Injectable} from '@angular/core';
import {Task} from "../../models/entity/task";
import {Subtask} from "../../models/entity/subtask";
import {TaskHttpService} from "./task-http.service";
import {BehaviorSubject, Observable} from "rxjs";
import {TaskSummary} from "../../models/interfaces/task-summary";
import {PRIORITIES, TASK_STATUSES} from "./task-constants";
import {TaskStatus} from "../../models/interfaces/task-status";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {DtoMapperService} from "../dtoMapperService/dto-mapper.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SNACKBAR_DURATION} from "../../utils/constants";
import {TaskReceiveDto} from "../../models/dtos/task-receive-dto";

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private _tasks$: BehaviorSubject<Task[] | undefined> = new BehaviorSubject<Task[] | undefined>(undefined);
  private _taskDetails$: BehaviorSubject<Task | undefined> = new BehaviorSubject<Task | undefined>(undefined);
  tasks: Task[] = [];

  constructor(private taskHttpService: TaskHttpService, private dtoMapperService: DtoMapperService, private matSnackBar: MatSnackBar) {
    this.fetchTasks()
  }

  public fetchTasks() {
    this.taskHttpService.fetchTasks().subscribe({
      next: (taskReceiveDtos: TaskReceiveDto[]) => {
        this.tasks = taskReceiveDtos.map(taskReceiveDto => this.dtoMapperService.mapTaskReceiveDtoToTask(taskReceiveDto));
        this._tasks$.next(this.tasks);
      }
    })
  }

  public get tasks$(): Observable<Task[]> {
    return this._tasks$.asObservable() as Observable<Task[]>;
  }

  public get taskDetails$(): Observable<Task> {
    return this._taskDetails$.asObservable() as Observable<Task>;
  }

  public set taskDetails(taskDetails: Task) {
    this._taskDetails$.next(taskDetails);
  }

  public createTask(task: Task, status?: TaskStatus) {
    if (status) {
      task.status = status;
    }
    this.taskHttpService.createTask(this.dtoMapperService.mapTaskToTaskSendDto(task)).subscribe({
      next: (taskReceiveDto: TaskReceiveDto) => {
        const task = this.dtoMapperService.mapTaskReceiveDtoToTask(taskReceiveDto);
        this._tasks$.next([...this.tasks, task]);
        this.matSnackBar.open(`Task has been created successfully!`,'', {duration: SNACKBAR_DURATION});
      },
      error:(err) => {
        this.matSnackBar.open('Task creation failed.', 'Ok');
      }
    });

  }

  public updateTask(task: Task, status?: TaskStatus) {
    if (status) {
      task.status = status;
    }

    this.taskHttpService.updateTask(this.dtoMapperService.mapTaskToTaskSendDto(task)).subscribe({
      next: (taskReceiveDto: TaskReceiveDto) => {
        const updatedTask = this.dtoMapperService.mapTaskReceiveDtoToTask(taskReceiveDto);
        const taskIndex = this.tasks.findIndex((e) => e.id === task.id);
        if (taskIndex > -1) {
          this.tasks[taskIndex] = updatedTask;
        }

        this._tasks$.next([...this.tasks]);
        this.matSnackBar.open(`Task has been updated successfully!`,'', {duration: SNACKBAR_DURATION});
      },
      error:(err) => {
        this.matSnackBar.open('Task updating failed.', 'Ok');
      }
    })
  }

  public deleteTask(taskId: number) {
    this.taskHttpService.deleteTask(taskId).subscribe({
      next: () => {
        const tmp = this.tasks;

        const index = this.tasks.findIndex((e) => e.id === taskId);
        if (index > -1) {
          tmp.splice(index, 1);
          this.matSnackBar.open(`Task has been deleted successfully!`,'', {duration: SNACKBAR_DURATION});
        }
        this._tasks$.next(tmp);
      },
      error:(err) => {
        this.matSnackBar.open('Task deletion failed.', 'Ok');
      }
    })
  }

  public filterTasks(searchText: string): void {
    if (!searchText) {
      this._tasks$.next(this.tasks);
    }

    searchText = searchText.toLowerCase();

    const filteredTasks = this.tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(searchText) ||
        task.description.toLowerCase().includes(searchText)
    );
    this._tasks$.next(filteredTasks);
  }

  public getTaskSummary(tasks: Task[]): TaskSummary {
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

    tasks.forEach(task => {
      if (task.status.key === TASK_STATUSES['TO_DO'].key) {
        taskSummary.toDoTasks++;
      }
      if (task.status.key === TASK_STATUSES['IN_PROGRESS'].key) {
        taskSummary.inProgressTasks++;
      }
      if (task.status.key === TASK_STATUSES['AWAIT_FEEDBACK'].key) {
        taskSummary.awaitingFeedbackTasks++;
      }
      if (task.status.key === TASK_STATUSES['DONE'].key) {
        taskSummary.doneTasks++;
      }
      if (task.priority.key === PRIORITIES['URGENT'].key) {
        taskSummary.urgentTasks++;
        if (!closestUrgentDeadline || closestUrgentDeadline > task.dueTo) {
          closestUrgentDeadline = task.dueTo;
        }
      }
    })
    taskSummary.closestUrgentDeadline = closestUrgentDeadline;
    taskSummary.totalTasks = this.tasks.length;
    return taskSummary;
  }

  public countCompletedSubtasks(subtasks: Subtask[]): number {
    let completedSubtasks: number = 0;
    subtasks.forEach(subtask => {
      if (subtask.isDone) {
        completedSubtasks++;
      }
    })
    return completedSubtasks;
  }

  public subtasksProgressInPercent(subtasks: Subtask[]) {
    return this.countCompletedSubtasks(subtasks) / subtasks.length * 100;
  }

  public onDropTask(event: CdkDragDrop<Task[]>) {
    const status = TASK_STATUSES[event.container.id];
    const task: Task = event.item.data;
    task.status = status;
    this.updateTask(task, status);

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
    event.previousContainer.data = [...event.previousContainer.data];
    event.container.data = [...event.container.data];
  }
}
