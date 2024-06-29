import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
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
import { CarouselModule } from 'primeng/carousel';
import {BreakpointObserver, BreakpointState} from "@angular/cdk/layout";

@Component({
  selector: 'app-task-status',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, TaskComponent, MatSuffix, CdkDropList, CdkDrag, CarouselModule],
  templateUrl: './task-status.component.html',
  styleUrl: './task-status.component.scss'
})
export class TaskStatusComponent implements OnInit, OnDestroy {
  @ViewChild(CdkDropList) list!: CdkDropList;
  protected readonly TASK_STATUSES = TASK_STATUSES;
  @Input() taskStatus!:TaskStatus;
  @Input() taskStatusKeys!: Array<string>;
  tasks!: Task[];
  tasksSubscription!: Subscription;
  tasksByStatus!: { [key: string]: Task[] };
  private breakpointSubscription!: Subscription;
  isScreenLarge: boolean = false;

  constructor(public taskService: TaskService, private taskDialogService:TaskDialogService, private breakpointObserver: BreakpointObserver) {}

  ngOnInit() {
    this.breakpointSubscription = this.breakpointObserver.observe([
      "(max-width: 1200px)"
    ]).subscribe((result: BreakpointState) => {
      this.isScreenLarge = result.matches;
    });

    this.tasksSubscription = this.taskService.tasks$.subscribe(tasks => {
      this.tasks = tasks;

      this.tasksByStatus = Object.keys(TASK_STATUSES).reduce((acc, cur) => {
        acc[cur] = this.tasks?.filter((x) => x.status.key === cur);

        return acc;
      }, {} as { [key: string]: Task[] });
    });
  }

  ngOnDestroy(): void {
    this.tasksSubscription.unsubscribe();
    if(this.breakpointSubscription) {
      this.breakpointSubscription.unsubscribe();
    }
  }

  public onDropTask(event: CdkDragDrop<Task[]>) {
    this.taskService.onDropTask(event);
  }

  public assignTasksByStatus(status: TaskStatus): Task[] {
    return this.tasksByStatus[status.key];
  }

  public createTaskDialog(taskStatus: TaskStatus) {
    this.taskDialogService.createTaskDialog(taskStatus);
  }
}
