import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {User} from "../../models/entity/user";
import {UserHttpService} from "./user-http.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _loggedUser$: BehaviorSubject<User | undefined> = new BehaviorSubject<User | undefined>(undefined);
  tmpLoggedUser: User = {
    id: 1,
    email: "max.mustermann@gmail.com",
    name: "Max Mustermann",
    token: "12345"
  }
  constructor(private userHttpService: UserHttpService, private router: Router) {
    this.loggedUser = this.tmpLoggedUser;
  }

  public get loggedUser$(): Observable<User> {
    return this._loggedUser$.asObservable() as Observable<User>;
  }

  public get loggedUser(): User {
    return this._loggedUser$.getValue() as User;
  }

  // TODO Code korrigieren
  public set loggedUser(user: User) {
    this._loggedUser$.next(this.tmpLoggedUser);
  }

  public login(userData: any) {
    this.userHttpService.login(userData).subscribe({
      next:(response: any) => {
        localStorage.setItem('token', response.token);
        this.router.navigateByUrl('/summary').then(r => {})
      },
      error: () => {
      },
    })
  }
}
