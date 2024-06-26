import {Injectable} from '@angular/core';
import {Task} from "../../models/entity/task";
import {Subtask} from "../../models/entity/subtask";
import {TaskHttpService} from "./task-http.service";
import {BehaviorSubject, Observable} from "rxjs";
import {TaskSummary} from "../../models/interfaces/task-summary";
import {PRIORITIES, TASK_STATUSES} from "./task-constants";
import {TaskStatus} from "../../models/interfaces/task-status";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {TaskDto} from "../../models/dtos/task-dto";
import {DtoMapperService} from "../dtoMapperService/dto-mapper.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SNACKBAR_DURATION} from "../../utils/constants";

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private _tasks$: BehaviorSubject<Task[] | undefined> = new BehaviorSubject<Task[] | undefined>(undefined);

  constructor(private taskHttpService: TaskHttpService, private dtoMapperService: DtoMapperService, private matSnackBar: MatSnackBar) {
    this.fetchTasks()
  }

  public fetchTasks() {
    this.taskHttpService.fetchTasks().subscribe({
      next: (taskDtos: TaskDto[]) => {
        const tasks = taskDtos.map(taskDto => this.dtoMapperService.mapTaskDtoToTask(taskDto));
        this._tasks$.next(tasks);
      }
    })
  }

  public get tasks$(): Observable<Task[]> {
    return this._tasks$.asObservable() as Observable<Task[]>;
  }

  public get tasks(): Task[] {
    return this._tasks$.getValue() as Task[];
  }

  public set tasks(tasks: Task[]) {
    this._tasks$.next(tasks);
  }

  public createTask(task: Task, status?: TaskStatus) {
    if (status) {
      task.status = status;
    }
    this.taskHttpService.createTask(this.dtoMapperService.mapTaskToTaskDto(task)).subscribe({
      next: (taskDto: TaskDto) => {
        const task = this.dtoMapperService.mapTaskDtoToTask(taskDto);
        this._tasks$.next([...this.tasks, task]);
        this.matSnackBar.open(`Task has been created successfully!`,'', {duration: SNACKBAR_DURATION});
      },
      error:(err) => {
        this.matSnackBar.open('Task creation failed. Please try again.', 'Ok');
      }
    });

  }

  public updateTask(task: Task, status?: string) {
    if (status) {
      // TODO
      //task.status = status;
    }
    this.taskHttpService.updateTask(task);
    console.log("Task", task);
  }

  public deleteTask(taskId: number) {
    this.taskHttpService.deleteTask(taskId);
    console.log("Task deleted");
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
    /*let fromContainer = event.previousContainer.id;
        let toContainer = event.container.id;
        let dragDropData: Task = event.item.data;
        console.log("fromContainer:", fromContainer)
        console.log("toContainer:", toContainer)
        console.log("dragDropData:", dragDropData)*/

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
