import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {TaskReceiveDto} from "../../models/dtos/task-receive-dto";
import {TaskSendDto} from "../../models/dtos/task-send-dto";

@Injectable({
  providedIn: 'root'
})
export class TaskHttpService {

  constructor(private httpClient: HttpClient,) { }

  public fetchTasks():Observable<TaskReceiveDto[]> {
    const url = environment.baseUrl + `/api/tasks/`;
    return this.httpClient.get<TaskReceiveDto[]>(url);
  }

  public createTask(taskSendDto: TaskSendDto):Observable<TaskReceiveDto> {
    const url = environment.baseUrl + `/api/tasks/`;
    return this.httpClient.post<TaskReceiveDto>(url, taskSendDto);
  }

  public updateTask(taskSendDto: TaskSendDto):Observable<TaskReceiveDto> {
    const url = environment.baseUrl + `/api/tasks/${taskSendDto.id}/`;
    return this.httpClient.patch<TaskReceiveDto>(url, taskSendDto);
  }

  public deleteTask(taskId: number):Observable<void> {
    const url = environment.baseUrl + `/api/tasks/${taskId}/`;
    return this.httpClient.delete<void>(url);
  }
}
