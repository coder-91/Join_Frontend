import {Injectable} from "@angular/core";
import {DialogService} from "../dialogService/dialog.service";
import {TaskService} from "./task.service";
import {Task} from "../../models/entity/task";
import {TaskViewComponent} from "../../components/master-layout/main-layout/task-view/task-view.component";
import {filter} from "rxjs";
import {MatDialog} from "@angular/material/dialog";

@Injectable({
  providedIn: 'root'
})
export class TaskDialogService {

  constructor(private taskService: TaskService, private dialog:MatDialog, private dialogService:DialogService) {}

  public createTaskDialog(taskStatus: string) {
    this.dialog.open(TaskViewComponent, {
      data: { fromPopup: true },
    }).afterClosed().pipe(filter((task) => task)).subscribe(task => {
      task.status = taskStatus;
      this.taskService.createTask(task);
    });
  }

  public editTaskDialog(task: Task) {
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
          this.taskService.deleteTask(taskId)
        }
      });
  }
}
