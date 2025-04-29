import { Injectable } from '@angular/core';
import {User} from "../../models/entity/user";
import {SNACKBAR_DURATION} from "../../utils/constants";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthHttpService} from "./auth-http.service";
import {UserDto} from "../../models/dtos/user-dto";
import {DtoMapperService} from "../dtoMapperService/dto-mapper.service";
import {BehaviorSubject, catchError, map, Observable, of} from "rxjs";
import {SessionService} from "../sessionService/session.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _loggedUser$: BehaviorSubject<User | undefined> = new BehaviorSubject<User | undefined>(undefined);
  private _isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    public authHttpService: AuthHttpService,
    public sessionService: SessionService,
    public dtoMapperService: DtoMapperService,
    private router: Router,
    private matSnackBar: MatSnackBar
  ) {}

  public get loggedUser$(): Observable<User> {
    return this._loggedUser$.asObservable() as Observable<User>;
  }

  public get loggedUser(): User {
    return this._loggedUser$.getValue() as User;
  }

  public set loggedUser(user: User) {
    this._loggedUser$.next(user);
  }

  public get isLoggedIn$(): Observable<boolean> {
    return this._isLoggedIn$.asObservable();
  }

  public validateToken(): Observable<boolean> {
    return this.authHttpService.fetchLoggedUser().pipe(
      map((userDto: UserDto) => {
        const user = this.dtoMapperService.mapUserDtoToUser(userDto);
        this._loggedUser$.next(user);
        this._isLoggedIn$.next(true);
        return true;
      }),
      catchError(() => {
        this.logout();
        return of(false);
      })
    );
  }

  public fetchLoggedUser() {
    this.authHttpService.fetchLoggedUser().subscribe({
      next: (userDto: UserDto) => {
        this._loggedUser$.next(this.dtoMapperService.mapUserDtoToUser(userDto))
      },
      error: () => {
        this.logout();
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

  public login(rememberMe: boolean, user?: Partial<User>) {
    this.authHttpService.login(user).subscribe({
      next:(response: { token: string, user: UserDto }) => {
        const user = this.dtoMapperService.mapUserDtoToUser(response.user);
        this._loggedUser$.next(user);
        this.sessionService.setToken(response.token, rememberMe);
        this._isLoggedIn$.next(true);
        this.router.navigateByUrl('/summary').then(r => {})
      },
      error: () => {
        this.matSnackBar.open('Login failed.', 'Ok');
      },
    })
  }

  public logout() {
    this.sessionService.clearToken();
    this._isLoggedIn$.next(false);
    this._loggedUser$.next(undefined);
    this.router.navigateByUrl('/login').then(r => {});
    this.matSnackBar.open('You\'ve been logged out', 'Ok', { duration: SNACKBAR_DURATION });
  }
}
