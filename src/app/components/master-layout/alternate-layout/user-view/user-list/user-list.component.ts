import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIconModule} from '@angular/material/icon';
import {MatList, MatListItem} from "@angular/material/list";
import {MatDivider} from "@angular/material/divider";
import {UserComponent} from "./user/user.component";
import {NgClass} from "@angular/common";
import {filter, Subscription, switchMap} from "rxjs";
import {UserService} from "../../../../../services/userService/user.service";
import {User} from "../../../../../models/entity/user";
import {AuthService} from "../../../../../services/authService/auth.service";

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

  constructor(private userService:UserService, private authService:AuthService) {
  }

  ngOnInit() {
    this.userSubscription = this.authService.loggedUser$.pipe(
      filter(loggedUser => !!loggedUser),
      switchMap(loggedUser => {
        this.loggedUser = loggedUser;
        return this.userService.users$;
      })
    ).subscribe(users => {
      this.users = users.filter(user => user?.id !== this.loggedUser.id && !user?.isGuest);
      this.groupedAndSortedUsers = this.userService.groupAndSortUsers(this.users);
    });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
