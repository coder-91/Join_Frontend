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
  private selectedUserSubscription!: Subscription;
  constructor(private router: Router, private userService: UserService, private userDialogService: UserDialogService) {}

  ngOnInit(): void {
    this.selectedUserSubscription = this.userService.selectedUser$.subscribe(user => {
      this.selectedUser = user;
    });
  }

  ngOnDestroy(): void {
    this.selectedUserSubscription.unsubscribe();
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
