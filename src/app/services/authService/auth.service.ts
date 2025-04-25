import { Injectable } from '@angular/core';
import {User} from "../../models/entity/user";
import {SNACKBAR_DURATION} from "../../utils/constants";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthHttpService} from "./auth-http.service";
import {UserDto} from "../../models/dtos/user-dto";
import {DtoMapperService} from "../dtoMapperService/dto-mapper.service";
import {BehaviorSubject, Observable} from "rxjs";
import {SessionService} from "../sessionService/session.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _loggedUser$: BehaviorSubject<User | undefined> = new BehaviorSubject<User | undefined>(undefined);

  constructor(
    public authHttpService: AuthHttpService,
    public sessionService: SessionService,
    public dtoMapperService: DtoMapperService,
    private router: Router,
    private matSnackBar: MatSnackBar
  ) {
    if (this.sessionService.isLoggedIn()) {
      this.fetchLoggedUser();
    }
  }

  public get loggedUser$(): Observable<User> {
    return this._loggedUser$.asObservable() as Observable<User>;
  }

  public get loggedUser(): User {
    return this._loggedUser$.getValue() as User;
  }

  public set loggedUser(user: User) {
    this._loggedUser$.next(user);
  }

  public fetchLoggedUser() {
    this.authHttpService.fetchLoggedUser().subscribe({
      next: (userDto: UserDto) => {
        this._loggedUser$.next(this.dtoMapperService.mapUserDtoToUser(userDto))
      },
      error: () => {
        this.logout();
        this.matSnackBar.open('Session expired, please log in again.', 'Ok');
      }
    })
  }

  public register(user: User) {
    this.authHttpService.register(this.dtoMapperService.mapUserToUserDto(user)).subscribe({
      next:(userDto: UserDto) => {
        this.router.navigateByUrl('/login').then(r => {})
        this.matSnackBar.open(`Your account has been created successfully!`,'', {duration: SNACKBAR_DURATION});
      },
      error:(err) => {
        if(err.error.email) {
          this.matSnackBar.open('User with this email already exists.', 'Ok');
        } else {
          this.matSnackBar.open('Account creation failed', 'Ok');
        }

      }
    });
  }

  public login(rememberMe: boolean, user?: Partial<User>, ) {
    this.authHttpService.login(user).subscribe({
      next:(response: { token: string, user: UserDto }) => {
        const user = this.dtoMapperService.mapUserDtoToUser(response.user);
        this._loggedUser$.next(user);
        this.sessionService.setToken(response.token, rememberMe);
        this.router.navigateByUrl('/summary').then(r => {})
      },
      error: () => {
        this.matSnackBar.open('Login failed.', 'Ok');
      },
    })
  }

  public logout() {
    const user = this._loggedUser$.getValue();
    if (user) {
      this.authHttpService.logout(user).subscribe({
        next: () => {
          this.sessionService.clearToken();
          this.router.navigateByUrl('/login').then(r => {});
          this.matSnackBar.open(`You have been successfully logged out.`, '', { duration: SNACKBAR_DURATION });
        },
        error: () => {
          this.matSnackBar.open('Logout failed.', 'Ok');
        }
      });
    } else {
      this.sessionService.clearToken();
      this.router.navigateByUrl('/login').then(r => {});
    }
  }

  public isLoggedIn(): boolean {
    return this.sessionService.isLoggedIn();
  }
}
