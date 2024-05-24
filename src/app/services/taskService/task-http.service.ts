import {Injectable} from "@angular/core";
import {Task} from "../../models/entity/task";
import {TaskStatus} from "../../models/interfaces/task-status";

@Injectable({
  providedIn: 'root'
})
export class TaskHttpService {
  public createTask(task: Task, status?:  TaskStatus) {

  }

  public editTask(task: Task) {

  }

  public deleteTask(taskId: number) {

  }
}
