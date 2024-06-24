import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIconModule} from '@angular/material/icon';
import {MatList, MatListItem} from "@angular/material/list";
import {MatDivider} from "@angular/material/divider";
import {UserDialogService} from "../../../../../services/userService/user-dialog.service";
import {UserComponent} from "./user/user.component";
import {NgClass} from "@angular/common";
import {Subscription} from "rxjs";
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
  usersSubscription!: Subscription;
  groupedAndSortedUsers!: { [key: string]: User[] };

  constructor(private userService:UserService, private userDialogService: UserDialogService) {}

  ngOnInit() {
    this.usersSubscription = this.userService.users$.subscribe(users => {
      this.users = users;
      this.groupedAndSortedUsers = this.userService.groupAndSortUsers(this.users);
    });
  }

  ngOnDestroy() {
    this.usersSubscription.unsubscribe();
  }

  public onCreateUser() {
    this.userDialogService.createUserDialog();
  }
}
