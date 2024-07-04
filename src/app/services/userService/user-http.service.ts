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
    const url = environment.baseUrl + `/api/users/`;
    return this.httpClient.get<UserDto[]>(url);
  }

  public fetchLoggedUser(): Observable<UserDto> {
    const url = environment.baseUrl + `/api/users/me/`;
    return this.httpClient.get<UserDto>(url);
  }

  public createUser(userDto: UserDto):Observable<UserDto> {
    const url = environment.baseUrl + `/api/users/register/`;
    return this.httpClient.post<UserDto>(url, userDto);
  }

  public updateUser(userDto: UserDto):Observable<UserDto> {
    const url = environment.baseUrl + `/api/users/${userDto.id}/`;
    return this.httpClient.patch<UserDto>(url, userDto);
  }

  public deleteUser(id: number):Observable<void> {
    const url = environment.baseUrl + `/api/users/${id}/`;
    return this.httpClient.delete<void>(url);
  }
}
