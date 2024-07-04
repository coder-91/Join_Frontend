import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {User} from "../../models/entity/user";

@Injectable({
  providedIn: 'root'
})
export class AuthHttpService {
  constructor(private httpClient: HttpClient,) { }

  public login(user: Partial<User>): Observable<{ token: string }> {
    const url = environment.baseUrl + `/api/users/token/`;
    return this.httpClient.post<{ token: string }>(url, user);
  }

  public logout(): Observable<void> {
    const url = environment.baseUrl + `/api/users/logout/`;
    return this.httpClient.post<void>(url, {});
  }
}
