import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { FormsModule }   from '@angular/forms';
import { Router } from '@angular/router';
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-login-view',
  standalone: true,
  imports: [FormsModule, MatInputModule, MatFormFieldModule, MatCheckboxModule, MatButtonModule, ReactiveFormsModule, NgClass],
  templateUrl: './login-view.component.html',
  styleUrl: './login-view.component.scss'
})
export class LoginViewComponent {
  loginForm: FormGroup;

  constructor(private router: Router) {
    this.loginForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required]),
        rememberMe: new FormControl(false)
      }
    );
  }

  public navigateToSignUp() {
    this.router.navigateByUrl('/sign-up');
  }

  public onSubmit(): void {
  }
}
