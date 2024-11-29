import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {MatListItem} from "@angular/material/list";
import {getInitials} from "../../../../../../utils/helpers";
import {NgClass, NgStyle} from "@angular/common";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {BreakpointObserver, BreakpointState} from "@angular/cdk/layout";
import {User} from "../../../../../../models/entity/user";
import {UserService} from "../../../../../../services/userService/user.service";
import {AvatarComponent} from "../../../../../shared/avatar/avatar.component";

@Component({
  selector: 'app-user',
  standalone: true,
    imports: [
        MatListItem,
        NgStyle,
        NgClass,
        AvatarComponent
    ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit, OnDestroy {
  @Input() user!: User;
  @Input() loggedUser!: User;
  protected readonly getInitials = getInitials;
  selectedUser: User | undefined;
  selectedUserSubscription!: Subscription;
  private breakpointSubscription!: Subscription;

  constructor(private breakpointObserver: BreakpointObserver, private router: Router, private userService: UserService) {
  }

  ngOnInit() {
    this.selectedUserSubscription = this.userService.selectedUser$.subscribe(user => {
      this.selectedUser = user;
    });
  }

  ngOnDestroy(): void {
    this.selectedUserSubscription.unsubscribe();
    if(this.breakpointSubscription) {
      this.breakpointSubscription.unsubscribe();
    }
  }

  public onSelectUser(user: User) {
    this.userService.selectedUser = user;

    if (this.breakpointSubscription) {
      this.breakpointSubscription.unsubscribe();
    }

    this.breakpointSubscription = this.breakpointObserver.observe([
      "(max-width: 992px)"
    ]).subscribe((result: BreakpointState) => {
      if (result.matches) {
        this.router.navigate(['users-details']).then(r => {})
      }
    });
  }
}
