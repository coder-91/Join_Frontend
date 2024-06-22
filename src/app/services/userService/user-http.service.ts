import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserHttpService {
  constructor(private httpClient: HttpClient,) { }

  public login(userData: any) {
    const url = environment.baseUrl + '/users/token/';
    return this.httpClient.post<string>(url, userData);
  }

}
