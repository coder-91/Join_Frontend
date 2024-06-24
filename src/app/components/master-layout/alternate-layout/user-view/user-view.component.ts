import { Component } from '@angular/core';
import {UserListComponent} from "./user-list/user-list.component";
import {UserDetailsComponent} from "./user-details/user-details.component";

@Component({
  selector: 'app-user-view',
  standalone: true,
  imports: [
    UserListComponent,
    UserDetailsComponent
  ],
  templateUrl: './user-view.component.html',
  styleUrl: './user-view.component.scss'
})
export class UserViewComponent {}
