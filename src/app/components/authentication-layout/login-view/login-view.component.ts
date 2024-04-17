import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import {FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormsModule }   from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-view',
  standalone: true,
  imports: [FormsModule, MatInputModule , MatFormFieldModule , MatIconModule, MatCheckboxModule , MatButtonModule, ReactiveFormsModule],
  templateUrl: './login-view.component.html',
  styleUrl: './login-view.component.scss'
})
export class LoginViewComponent {
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', [Validators.required]);
  rememberMeFormControl = new FormControl(false);
  
  constructor(private router: Router) { }

  public navigateToRegister() {
    this.router.navigateByUrl('/register');
  }

  public onSubmit(): void {
  }
}
