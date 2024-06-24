import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {User} from "../../models/entity/user";
import {UserHttpService} from "./user-http.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _users$: BehaviorSubject<User[] | undefined> = new BehaviorSubject<User[] | undefined>(undefined);
  private _selectedUser$: BehaviorSubject<User | undefined> = new BehaviorSubject<User | undefined>(undefined);
  private _loggedUser$: BehaviorSubject<User | undefined> = new BehaviorSubject<User | undefined>(undefined);
  tmpLoggedUser: User = {
    id: 1,
    email: "max.mustermann@gmail.com",
    name: "Max Mustermann",
    phoneNumber: '+1234567890',
    avatarColor: '#ff0000'
  }

  usersTmp: User[] = [
    {
      id: 1,
      email: 'john.doe@example.com',
      name: 'John Doe',
      phoneNumber: '+1234567890',
      avatarColor: '#ff0000'
    },
    {
      id: 2,
      email: 'jane.doe@example.com',
      name: 'Jane Doe',
      phoneNumber: '+0987654321',
      avatarColor: '#00ff00'
    },
    {
      id: 3,
      email: 'alice.smith@example.com',
      name: 'Alice Smith',
      phoneNumber: '+1122334455',
      avatarColor: '#0000ff'
    },
    {
      id: 4,
      email: 'bob.smith@example.com',
      name: 'Bob Smith',
      phoneNumber: '+6677889900',
      avatarColor: '#ffff00'
    },
    {
      id: 5,
      email: 'emma.jones@example.com',
      name: 'Emma Jones',
      phoneNumber: '+1123456789',
      avatarColor: '#ff00ff'
    }
  ];

  constructor(private userHttpService: UserHttpService, private router: Router) {
    this.fetchUsers();
    this.loggedUser = this.tmpLoggedUser;
  }

  public fetchUsers() {
    this.users = this.usersTmp;
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

  // TODO Code korrigieren
  public set users(users: User[]) {
    this._users$.next(this.usersTmp);
  }

  public get selectedUser$(): Observable<User> {
    return this._selectedUser$.asObservable() as Observable<User>;
  }

  public get selectedUser(): User {
    return this._selectedUser$.getValue() as User;
  }

  public set selectedUser(user: User) {
    this._selectedUser$.next(user);
  }

  // TODO Code korrigieren
  public set loggedUser(user: User) {
    this._loggedUser$.next(user);
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

  public createUser(user: User) {
    this.userHttpService.createUser(user);
  }

  public updateUser(user: User) {
    this.userHttpService.updateUser(user);
  }

  public deleteUser(id: number) {
    this.userHttpService.deleteUser(id);
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
