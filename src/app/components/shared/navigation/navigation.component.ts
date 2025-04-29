import {Component} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {RouterLinkActive, RouterLink} from '@angular/router';
import {AuthService} from "../../../services/authService/auth.service";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatIconModule, AsyncPipe],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent {
  constructor(public authService: AuthService) {
  }
}
