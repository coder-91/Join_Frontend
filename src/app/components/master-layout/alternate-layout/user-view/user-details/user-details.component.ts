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
import {BreakpointObserver, BreakpointState} from "@angular/cdk/layout";
import {AvatarComponent} from "../../../../shared/avatar/avatar.component";

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [
    MatButton,
    MatIcon,
    MatIconButton,
    MatMenuModule,
    NgStyle,
    AvatarComponent
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
  private breakpointSubscription!: Subscription;

  constructor(private breakpointObserver: BreakpointObserver, private router: Router, private authService: AuthService, private userService: UserService, private userDialogService: UserDialogService) {}

  ngOnInit(): void {
    this.selectedUserSubscription = this.userService.selectedUser$.subscribe(user => {
      this.selectedUser = user;
    });

    this.loggedUserSubscription = this.authService.loggedUser$.subscribe(user => {
      this.loggedUser = user;
    });

    this.breakpointSubscription = this.breakpointObserver.observe([
      "(min-width: 992px)"
    ]).subscribe((result: BreakpointState) => {
      if (result.matches) {
        this.router.navigate(['users']).then(r =>{})
      }
    });
  }

  ngOnDestroy(): void {
    this.selectedUserSubscription.unsubscribe();
    this.loggedUserSubscription.unsubscribe();
    if(this.breakpointSubscription) {
      this.breakpointSubscription.unsubscribe();
    }
  }

  public onUpdateUser() {
    const buttonElement = document.activeElement as HTMLElement;
    buttonElement.blur();
    this.userDialogService.updateUserDialog(this.selectedUser);
  }

  public onDeleteUser() {
    this.userDialogService.deleteUserDialog(this.selectedUser.id)
  }

  public backToPreviousComponent() {
    this.router.navigate(['users']).then(r =>{})
  }
}
