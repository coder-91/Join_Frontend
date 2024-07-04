import { Injectable } from '@angular/core';
import {User} from "../../models/entity/user";
import {SNACKBAR_DURATION} from "../../utils/constants";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthHttpService} from "./auth-http.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private authHttpService: AuthHttpService, private router: Router, private matSnackBar: MatSnackBar) { }

  public login(user: Partial<User>) {
    this.authHttpService.login(user).subscribe({
      next:(response: { token: string }) => {
        localStorage.setItem('token', response.token);
        this.router.navigateByUrl('/summary').then(r => {})
      },
      error: () => {
        this.matSnackBar.open('Login failed.', 'Ok');
      },
    })
  }

  public logout() {
    this.authHttpService.logout().subscribe({
      next:(response) => {
        localStorage.removeItem('token');
        this.matSnackBar.open(`You have been successfully logged out.`,'', {duration: SNACKBAR_DURATION});
        this.router.navigateByUrl('/login').then(r => {})
      },
      error: () => {
        this.matSnackBar.open('Logout failed.', 'Ok');
      },
    })
  }
}
