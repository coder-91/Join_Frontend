import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {User} from "../../models/entity/user";

@Injectable({
  providedIn: 'root'
})
export class UserHttpService {
  constructor(private httpClient: HttpClient,) { }

  public login(userData: any) {
    const url = environment.baseUrl + '/api/users/token/';
    return this.httpClient.post<string>(url, userData);
  }

  public createUser(user: User) {

  }

  public updateUser(user: User) {

  }

  public deleteUser(id: number) {

  }



}
