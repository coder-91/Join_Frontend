import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {UserDto} from "../../models/dtos/user-dto";

@Injectable({
  providedIn: 'root'
})
export class UserHttpService {
  constructor(private httpClient: HttpClient,) { }

  public fetchUsers(): Observable<UserDto[]> {
    const url = `${environment.protocol}://${environment.hostname}:${environment.port}/api/users/`;
    return this.httpClient.get<UserDto[]>(url);
  }

  public updateUser(userDto: UserDto):Observable<UserDto> {
    const url = `${environment.protocol}://${environment.hostname}:${environment.port}/api/users/${userDto.id}/`;
    return this.httpClient.patch<UserDto>(url, userDto);
  }

  public deleteUser(id: number):Observable<void> {
    const url = `${environment.protocol}://${environment.hostname}:${environment.port}/api/users/${id}/`;
    return this.httpClient.delete<void>(url);
  }
}
