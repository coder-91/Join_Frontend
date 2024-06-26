import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {User} from "../../models/entity/user";
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

  public login(user: Partial<User>): Observable<{ token: string }> {
    const url = environment.baseUrl + `/api/users/token/`;
    return this.httpClient.post<{ token: string }>(url, user);
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
