import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {Location} from "@angular/common";
import {AuthService} from "../../../../services/authService/auth.service";

@Component({
  selector: 'app-privacy-policy-view',
  standalone: true,
  imports: [
    MatIcon,
    MatIconButton
  ],
  templateUrl: './privacy-policy-view.component.html',
  styleUrl: './privacy-policy-view.component.scss'
})
export class PrivacyPolicyViewComponent {
  constructor(private router: Router, private location: Location, private authService: AuthService) {}

  public navigateToLogin() {
    if(this.authService.isLoggedIn()) {
      this.location.back();
    } else {
      this.router.navigateByUrl('/login')
    }
  }
}
