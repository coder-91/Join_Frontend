import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIconModule} from '@angular/material/icon';
import {MatList, MatListItem} from "@angular/material/list";
import {MatDivider} from "@angular/material/divider";
import {UserComponent} from "./user/user.component";
import {NgClass} from "@angular/common";
import {combineLatest, Subscription} from "rxjs";
import {UserService} from "../../../../../services/userService/user.service";
import {User} from "../../../../../models/entity/user";

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    MatButton,
    MatIconModule,
    MatList,
    MatListItem,
    MatDivider,
    MatIconButton,
    UserComponent,
    NgClass
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit, OnDestroy {
  protected readonly Object = Object;
  users!: User[];
  loggedUser!: User;
  userSubscription!: Subscription;
  groupedAndSortedUsers!: { [key: string]: User[] };

  constructor(private userService:UserService) {
  }

  ngOnInit() {
    this.userSubscription = combineLatest([
      this.userService.loggedUser$,
      this.userService.users$
    ]).subscribe(([loggedUser,users]) => {
      this.loggedUser = loggedUser;
      this.users = users;

      if (this.loggedUser && this.users) {
        const filteredUsers = this.users.filter(user => user.id !== this.loggedUser.id);
        this.groupedAndSortedUsers = this.userService.groupAndSortUsers(filteredUsers);
      }
    });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
