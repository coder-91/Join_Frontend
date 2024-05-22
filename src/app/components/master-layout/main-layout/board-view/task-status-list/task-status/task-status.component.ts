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
import {CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";

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
  tasksByStatus!: { [key: string]: Task[] };
  tasksSubscription!: Subscription;

  constructor(public taskService: TaskService, private taskDialogService:TaskDialogService) {}

  ngOnInit() {
    this.tasksSubscription = this.taskService.tasks$.subscribe(tasks => {
      this.tasks = tasks;
    });

    this.tasksByStatus = Object.keys(TASK_STATUSES).reduce((acc, cur) => {
      acc[cur] = this.tasks.filter((x) => x.status.key === cur);

      return acc;
    }, {} as { [key: string]: Task[] });
  }



  ngOnDestroy(): void {
    this.tasksSubscription.unsubscribe();
  }

  drop(event: CdkDragDrop<Task[]>) {
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
  }

  public assignTasksByStatus(status: string): Task[] {
    return this.tasksByStatus[status];
  }

  public createTaskDialog(taskStatus: string) {
    this.taskDialogService.createTaskDialog(taskStatus);
  }
}
