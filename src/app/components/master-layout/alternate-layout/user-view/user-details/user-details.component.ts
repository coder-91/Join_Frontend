import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatMenuModule} from '@angular/material/menu';
import {UserService} from "../../../../../services/userService/user.service";
import {getInitials} from "../../../../../utils/helpers";
import {Subscription} from "rxjs";
import {NgStyle} from "@angular/common";
import {UserDialogService} from "../../../../../services/userService/user-dialog.service";
import {Router} from "@angular/router";
import {User} from "../../../../../models/entity/user";
import {AuthService} from "../../../../../services/authService/auth.service";

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [
    MatButton,
    MatIcon,
    MatIconButton,
    MatMenuModule,
    NgStyle
  ],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss'
})
export class UserDetailsComponent implements OnInit, OnDestroy  {
  protected readonly getInitials = getInitials;
  selectedUser!: User;
  loggedUser!: User;
  private selectedUserSubscription!: Subscription;
  private loggedUserSubscription!: Subscription;
  constructor(private router: Router, private authService: AuthService, private userService: UserService, private userDialogService: UserDialogService) {}

  ngOnInit(): void {
    this.selectedUserSubscription = this.userService.selectedUser$.subscribe(user => {
      this.selectedUser = user;
    });

    this.loggedUserSubscription = this.authService.loggedUser$.subscribe(user => {
      this.loggedUser = user;
    });
  }

  ngOnDestroy(): void {
    this.selectedUserSubscription.unsubscribe();
    this.loggedUserSubscription.unsubscribe();
  }

  public onUpdateUser() {
    this.userDialogService.updateUserDialog(this.selectedUser);
  }

  public onDeleteUser() {
    this.userDialogService.deleteUserDialog(this.selectedUser.id)
  }

  public backToPreviousComponent() {
    this.router.navigate(['users']).then(r =>{})
  }
}
