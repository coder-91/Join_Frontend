import {Component} from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {NgClass} from "@angular/common";
import {MatIconModule} from '@angular/material/icon';
import {AuthService} from "../../../services/authService/auth.service";

@Component({
  selector: 'app-login-view',
  standalone: true,
    imports: [FormsModule, MatIconModule, MatInputModule, MatFormFieldModule, MatCheckboxModule, MatButtonModule, ReactiveFormsModule, NgClass],
  templateUrl: './login-view.component.html',
  styleUrl: './login-view.component.scss'
})
export class LoginViewComponent {
  loginForm: FormGroup;
  hidePassword = true;
  constructor(private router: Router, private authService: AuthService) {
    this.loginForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required]),
        rememberMe: new FormControl(false)
      }
    );
  }

  public navigateToSignUp() {
    this.router.navigateByUrl('/sign-up').then(r => {});
  }

  public onSubmit(): void {
    this.authService.login(this.loginForm.getRawValue().rememberMe, this.loginForm.getRawValue())
  }

  public loginAsGuest() {
    this.authService.login(true);
  }
}
