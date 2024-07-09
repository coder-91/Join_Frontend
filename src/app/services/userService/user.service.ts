import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {User} from "../../models/entity/user";
import {UserHttpService} from "./user-http.service";
import {Router} from "@angular/router";
import {SNACKBAR_DURATION} from "../../utils/constants";
import {DtoMapperService} from "../dtoMapperService/dto-mapper.service";
import {UserDto} from "../../models/dtos/user-dto";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthService} from "../authService/auth.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _users$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  private _selectedUser$: BehaviorSubject<User | undefined> = new BehaviorSubject<User | undefined>(undefined);
  constructor(private userHttpService: UserHttpService, private authService:AuthService, private router: Router, private dtoMapperService: DtoMapperService, private matSnackBar: MatSnackBar) {
      this.fetchUsers();
      this.authService.fetchLoggedUser();
  }

  public get users$(): Observable<User[]> {
    return this._users$.asObservable();
  }

  public get users(): User[] {
    return this._users$.getValue() as User[];
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

  public fetchUsers() {
    this.userHttpService.fetchUsers().subscribe({
      next: (usersDtos: UserDto[]) => {
        const users = usersDtos.map(userDto => this.dtoMapperService.mapUserDtoToUser(userDto));
        this._users$.next(users);
      }
    });
  }

  public updateUser(user: User) {
    this.userHttpService.updateUser(this.dtoMapperService.mapUserToUserDto(user)).subscribe({
      next:(userDto: UserDto) => {
        this._selectedUser$.next(this.dtoMapperService.mapUserDtoToUser(userDto))
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
          localStorage.removeItem('token');
          sessionStorage.removeItem('token');
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
