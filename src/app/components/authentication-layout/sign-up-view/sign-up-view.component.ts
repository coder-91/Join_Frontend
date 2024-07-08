import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormGroupDirective, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule }   from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import {NgClass} from "@angular/common";
import {MatIconModule} from '@angular/material/icon';
import {AuthService} from "../../../services/authService/auth.service";

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    return !!(form?.errors?.['mismatch'] && control?.touched);
  }
}

@Component({
  selector: 'sign-up-view',
  standalone: true,
    imports: [ReactiveFormsModule, MatIconModule, MatInputModule, MatFormFieldModule, MatCheckboxModule, MatButtonModule, FormsModule, NgClass],
  templateUrl: './sign-up-view.component.html',
  styleUrl: './sign-up-view.component.scss'
})

export class SignUpViewComponent {
  hidePassword = true;
  hidePasswordConfirm = true;
  signUpForm: FormGroup;
  matcher = new MyErrorStateMatcher();

  constructor(private router: Router, public authService: AuthService) {
    this.signUpForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phoneNumber: new FormControl(''),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', [Validators.required]),
      privacyPolicy: new FormControl(false, [Validators.requiredTrue])
    },
      { validators: this.passwordMatchValidator }
    );
  }

  private passwordMatchValidator(control: AbstractControl) {
    return control.get('password')?.value ===
      control.get('confirmPassword')?.value
      ? null
      : { mismatch: true };
  }

  public navigateToLogin() {
    this.router.navigateByUrl('/login');
  }

  public onSubmit(): void {
    this.authService.register(this.signUpForm.getRawValue())
  }
}
