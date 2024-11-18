import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import {SubtaskDto} from "../../models/dtos/subtask-dto";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class SubtaskHttpService {
  constructor(private httpClient: HttpClient,) { }

  public fetchSubtasks():Observable<SubtaskDto[]> {
    const url = `${environment.protocol}://${environment.hostname}:${environment.port}/api/subtasks/`;
    return this.httpClient.get<SubtaskDto[]>(url);
  }

  public createSubtask(subtaskDto: SubtaskDto):Observable<SubtaskDto> {
    const url = `${environment.protocol}://${environment.hostname}:${environment.port}/api/subtasks/`;
    return this.httpClient.post<SubtaskDto>(url, subtaskDto);
  }

  public updateSubtask(subtaskDto: SubtaskDto):Observable<SubtaskDto> {
    const url = `${environment.protocol}://${environment.hostname}:${environment.port}/api/subtasks/${subtaskDto.id}/`;
    return this.httpClient.patch<SubtaskDto>(url, subtaskDto);
  }

  public deleteSubtask(subtaskId: number):Observable<void> {
    const url = `${environment.protocol}://${environment.hostname}:${environment.port}/api/tasks/${subtaskId}/`;
    return this.httpClient.delete<void>(url);
  }
}
