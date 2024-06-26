import {Injectable} from "@angular/core";
import {Task} from "../../models/entity/task";
import {Observable} from "rxjs";
import {TaskDto} from "../../models/dtos/task-dto";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TaskHttpService {

  constructor(private httpClient: HttpClient,) { }

  public fetchTasks():Observable<TaskDto[]> {
    const url = environment.baseUrl + `/api/tasks/`;
    return this.httpClient.get<TaskDto[]>(url);
  }
  public createTask(taskDto: TaskDto):Observable<TaskDto> {
    const url = environment.baseUrl + `/api/tasks/`;
    return this.httpClient.post<TaskDto>(url, taskDto);
  }

  public updateTask(task: Task) {

  }

  public deleteTask(taskId: number) {

  }
}
