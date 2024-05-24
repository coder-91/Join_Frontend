import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {TaskComponent} from "./task/task.component";
import {TaskStatus} from "../../../../../../models/interfaces/task-status";
import {Task} from '../../../../../../models/entity/task';
import {MatSuffix} from "@angular/material/form-field";
import {TaskService} from "../../../../../../services/taskService/task.service";
import {TaskDialogService} from "../../../../../../services/taskService/task-dialog.service";
import {Subscription} from "rxjs";
import {TASK_STATUSES} from "../../../../../../services/taskService/task-constants";
import {CdkDrag, CdkDragDrop, CdkDropList} from "@angular/cdk/drag-drop";

@Component({
  selector: 'app-task-status',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, TaskComponent, MatSuffix, CdkDropList, CdkDrag],
  templateUrl: './task-status.component.html',
  styleUrl: './task-status.component.scss'
})
export class TaskStatusComponent implements OnInit, OnDestroy {
  protected readonly TASK_STATUSES = TASK_STATUSES;
  @Input() taskStatus!:TaskStatus;
  tasks!: Task[];
  tasksSubscription!: Subscription;
  tasksByStatus!: { [key: string]: Task[] };
  tasksByStatusSubscription!: Subscription;

  constructor(public taskService: TaskService, private taskDialogService:TaskDialogService) {}

  ngOnInit() {
    this.tasksSubscription = this.taskService.tasks$.subscribe(tasks => {
      this.tasks = tasks;
    });

    this.tasksByStatusSubscription = this.taskService.tasksByStatus$.subscribe(tasksByStatus => {
      this.tasksByStatus = tasksByStatus;
    });
  }

  ngOnDestroy(): void {
    this.tasksSubscription.unsubscribe();
    this.tasksByStatusSubscription.unsubscribe();
  }

  public onDropTask(event: CdkDragDrop<Task[]>) {
    this.taskService.onDropTask(event);
  }

  public assignTasksByStatus(status: string): Task[] {
    return this.tasksByStatus[status];
  }

  public createTaskDialog(taskStatus: string) {
    this.taskDialogService.createTaskDialog(taskStatus);
  }

  public getTaskCount(status: string): number {
    return this.tasksByStatus[status]?.length || 0;
  }
}
