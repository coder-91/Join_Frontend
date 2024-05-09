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

@Component({
  selector: 'app-task-status',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, TaskComponent, MatSuffix],
  templateUrl: './task-status.component.html',
  styleUrl: './task-status.component.scss'
})
export class TaskStatusComponent implements OnInit, OnDestroy {
  @Input() taskStatus!:TaskStatus;
  tasks!: Task[];
  tasksSubscription!: Subscription;

  constructor(public taskService: TaskService, private taskDialogService:TaskDialogService) {}

  ngOnInit() {
    this.tasksSubscription = this.taskService.tasks$.subscribe(tasks => {
      this.tasks = tasks;
    });
  }

  ngOnDestroy(): void {
    this.tasksSubscription.unsubscribe();
  }

  public assignTasksByStatus(status: string): Task[] {
    return this.taskService.filterTasksByStatus(status);
  }

  public createTaskDialog(taskStatus: string) {
    this.taskDialogService.createTaskDialog(taskStatus);
  }
}
