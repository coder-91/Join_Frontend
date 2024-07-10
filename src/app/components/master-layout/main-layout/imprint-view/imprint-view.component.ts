import { Component } from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {Router} from "@angular/router";
import {Location} from "@angular/common";
import {AuthService} from "../../../../services/authService/auth.service";

@Component({
  selector: 'app-imprint-view',
  standalone: true,
    imports: [
        MatIcon,
        MatIconButton
    ],
  templateUrl: './imprint-view.component.html',
  styleUrl: './imprint-view.component.scss'
})
export class ImprintViewComponent {
  constructor(private router: Router, private location: Location, private authService: AuthService) {}

  public navigateToLogin() {
    if(this.authService.isLoggedIn()) {
      this.location.back();
    } else {
      this.router.navigateByUrl('/login')
    }
  }
}
