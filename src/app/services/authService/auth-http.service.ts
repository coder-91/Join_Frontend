import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {User} from "../../models/entity/user";
import {UserDto} from "../../models/dtos/user-dto";

@Injectable({
  providedIn: 'root'
})
export class AuthHttpService {
  constructor(private httpClient: HttpClient,) { }

  public fetchLoggedUser(): Observable<UserDto> {
    const url = environment.baseUrl + `/api/users/me/`;
    return this.httpClient.get<UserDto>(url);
  }

  public register(userDto: UserDto):Observable<UserDto> {
    const url = environment.baseUrl + `/api/users/register/`;
    return this.httpClient.post<UserDto>(url, userDto);
  }

  public login(user?: Partial<User>): Observable<{ token: string, user: UserDto }> {
    const url = user ? environment.baseUrl + `/api/users/login/` : environment.baseUrl + `/api/users/login/guest/`;
    return this.httpClient.post<{ token: string, user: UserDto }>(url, user);
  }

  public logout(loggedUser: User): Observable<void> {
    const url = loggedUser.isGuest ? environment.baseUrl + `/api/users/logout/guest/` : environment.baseUrl + `/api/users/logout/`;
    return this.httpClient.post<void>(url, {});
  }
}
