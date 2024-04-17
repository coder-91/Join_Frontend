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

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    return !!(form?.errors?.['mismatch'] && form?.touched);
  }
}

@Component({
  selector: 'sign-up-view',
  standalone: true,
  imports: [ReactiveFormsModule, MatInputModule, MatFormFieldModule, MatCheckboxModule, MatButtonModule, FormsModule, NgClass],
  templateUrl: './sign-up-view.component.html',
  styleUrl: './sign-up-view.component.scss'
})

export class SignUpViewComponent {
  signUpForm: FormGroup;
  matcher = new MyErrorStateMatcher();

  constructor(private router: Router) {
    this.signUpForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      email: new FormControl('', [Validators.required, Validators.email]),
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
  }
}
