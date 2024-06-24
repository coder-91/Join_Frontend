import {Injectable} from "@angular/core";
import {DialogService} from "../dialogService/dialog.service";
import {TaskService} from "./task.service";
import {Task} from "../../models/entity/task";
import {TaskViewComponent} from "../../components/master-layout/main-layout/task-view/task-view.component";
import {filter} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {TaskStatus} from "../../models/interfaces/task-status";
import {
  TaskDetailsComponent
} from "../../components/master-layout/main-layout/board-view/task-status-list/task-status/task/task-details/task-details.component";

@Injectable({
  providedIn: 'root'
})
export class TaskDialogService {

  constructor(private taskService: TaskService, private dialog:MatDialog, private dialogService:DialogService) {}

  public createTaskDialog(taskStatus: TaskStatus) {
    this.dialog.open(TaskViewComponent, {
      data: { fromPopup: true },
    }).afterClosed().pipe(filter((task) => task)).subscribe(task => {
      task.status = taskStatus;
      this.taskService.createTask(task);
    });
  }

  public updateTaskDialog(task: Task) {
    this.dialog.open(TaskViewComponent, {
      data: { fromPopup: true, task: task},
    }).afterClosed().pipe(filter((task) => task)).subscribe(task => {
      this.taskService.updateTask(task);
    });
  }

  public deleteTaskDialog(taskId: number) {
    this.dialogService
      .confirmDialog({
        title: 'Delete task?',
        message: 'Are you sure you want to delete this task?',
        confirmCaption: 'Yes',
        cancelCaption: 'No',
      })
      .subscribe((yes) => {
        if (yes) {
          this.dialog.closeAll();
          this.taskService.deleteTask(taskId)
        }
      });
  }

  public showTaskDetailsDialog(task: Task) {
    this.dialog.open(TaskDetailsComponent, {
      data: { fromPopup: true, task: task },
    }).afterClosed().pipe(filter((task) => task)).subscribe(task => {

    });
  }
}
