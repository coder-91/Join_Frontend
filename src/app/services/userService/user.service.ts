import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {User} from "../../models/entity/user";
import {UserHttpService} from "./user-http.service";
import {Router} from "@angular/router";
import {SNACKBAR_DURATION} from "../../utils/constants";
import {DtoMapperService} from "../dtoMapperService/dto-mapper.service";
import {UserDto} from "../../models/dtos/user-dto";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _users$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  private _selectedUser$: BehaviorSubject<User | undefined> = new BehaviorSubject<User | undefined>(undefined);
  private _loggedUser$: BehaviorSubject<User | undefined> = new BehaviorSubject<User | undefined>(undefined);

  constructor(private userHttpService: UserHttpService, private router: Router, private dtoMapperService: DtoMapperService, private matSnackBar: MatSnackBar) {
    this.fetchUsers();
    this.fetchLoggedUser();
  }

  public get users$(): Observable<User[]> {
    return this._users$.asObservable() as Observable<User[]>;
  }

  public get users(): User[] {
    return this._users$.getValue() as User[];
  }

  public get loggedUser$(): Observable<User> {
    return this._loggedUser$.asObservable() as Observable<User>;
  }

  public get loggedUser(): User {
    return this._loggedUser$.getValue() as User;
  }

  public get selectedUser$(): Observable<User> {
    return this._selectedUser$.asObservable() as Observable<User>;
  }

  public get selectedUser(): User {
    return this._selectedUser$.getValue() as User;
  }

  public set users(users: User[]) {
    this._users$.next(users);
  }

  public set selectedUser(user: User) {
    this._selectedUser$.next(user);
  }

  public set loggedUser(user: User) {
    this._loggedUser$.next(user);
  }

  public fetchUsers() {
    this.userHttpService.fetchUsers().subscribe({
      next: (usersDtos: UserDto[]) => {
        const users = usersDtos.map(userDto => this.dtoMapperService.mapUserDtoToUser(userDto));
        this._users$.next(users);
      }
    });
  }

  public fetchLoggedUser() {
    this.userHttpService.fetchLoggedUser().subscribe({
      next: (userDto: UserDto) => {
        this._loggedUser$.next(this.dtoMapperService.mapUserDtoToUser(userDto))
      }
    })
  }

  public login(user: Partial<User>) {
    this.userHttpService.login(user).subscribe({
      next:(response: { token: string }) => {
        localStorage.setItem('token', response.token);
        this.fetchLoggedUser();
        this.router.navigateByUrl('/summary').then(r => {})
      },
      error: () => {
        this.matSnackBar.open('Login failed.', 'Ok');
      },
    })
  }

  public isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  public logout() {
    this.userHttpService.logout().subscribe({
      next:(response) => {
        localStorage.removeItem('token');
        this.matSnackBar.open(`You have been successfully logged out.`,'', {duration: SNACKBAR_DURATION});
        this.router.navigateByUrl('/login').then(r => {})
      },
      error: () => {
        this.matSnackBar.open('Logout failed.', 'Ok');
      },
    })
  }

  public createUser(user: User) {
    this.userHttpService.createUser(this.dtoMapperService.mapUserToUserDto(user)).subscribe({
      next:(userDto: UserDto) => {
        this.users.push(this.dtoMapperService.mapUserDtoToUser(userDto));
        this.router.navigateByUrl('/login').then(r => {})
        this.matSnackBar.open(`Your account has been created successfully!`,'', {duration: SNACKBAR_DURATION});
      },
      error:(err) => {
        this.matSnackBar.open('Account creation failed', 'Ok');
      }
    });
  }

  public updateUser(user: User) {
    this.userHttpService.updateUser(this.dtoMapperService.mapUserToUserDto(user)).subscribe({
      next:(userDto: UserDto) => {
        this._selectedUser$.next(this.dtoMapperService.mapUserDtoToUser(userDto))
        this._loggedUser$.next(this.dtoMapperService.mapUserDtoToUser(userDto))
        this.matSnackBar.open(`Your account has been updated successfully!`,'', {duration: SNACKBAR_DURATION});
      },
      error:() => {
        this.matSnackBar.open('Account updating failed.', 'Ok');
      }
    });
  }

  public deleteUser(id: number) {
    this.userHttpService.deleteUser(id).subscribe({
      next: () => {
        const users = this.users;
        const index = this.users.findIndex((user) => user.id === id);
        if (index > -1) {
          users.splice(index, 1);
          this.router.navigateByUrl('/login').then(r => {})
          this.matSnackBar.open(`Your account has been deleted successfully!`,'', {duration: SNACKBAR_DURATION});
        }
      },
      error:() => {
        this.matSnackBar.open('Account deleting failed.', 'Ok');
      }
    })
  }

  public groupAndSortUsers(users: User[]): { [key: string]: User[] } {
    const sortedUsers: { [key: string]: User[] } = {};

    users.forEach(user => {
      const firstLetter = user.name.charAt(0).toUpperCase();
      if (!sortedUsers[firstLetter]) {
        sortedUsers[firstLetter] = [];
      }
      sortedUsers[firstLetter].push(user);
    });

    const sortedKeys = Object.keys(sortedUsers).sort();

    sortedKeys.forEach(letter => {
      sortedUsers[letter].sort((a, b) => a.name.localeCompare(b.name));
    });

    const sortedUsersResult: { [key: string]: User[] } = {};
    sortedKeys.forEach(letter => {
      sortedUsersResult[letter] = sortedUsers[letter];
    });

    return sortedUsersResult;
  }
}
