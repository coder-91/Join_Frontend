import {Component, Inject} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatError, MatLabel} from "@angular/material/form-field";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import {User} from "../../../../../models/entity/user";
import {getInitials} from "../../../../../utils/helpers";
import {AvatarComponent} from "../../../../shared/avatar/avatar.component";

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCheckbox,
    MatError,
    MatFormFieldModule,
    MatInputModule,
    MatLabel,
    ReactiveFormsModule,
    MatIconModule,
    AvatarComponent
  ],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent {
  protected readonly getInitials = getInitials;
  userForm: FormGroup;

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<UserFormComponent>, @Inject(MAT_DIALOG_DATA) public user: User) {
    this.userForm = this.fb.group({
      id: this.user?.id,
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phoneNumber: new FormControl(''),
    });

    if (this.user) {
      this.userForm.patchValue(this.user);
    }
  }

  public onSubmit() {
    if (this.user) {
      this.onUpdateUser();
    } else {
      this.onCreateUser();
    }
    this.userForm.reset();
  }

  public onCreateUser() {
    this.dialogRef.close(this.userForm.getRawValue());
  }

  public onUpdateUser() {
    this.dialogRef.close(this.userForm.getRawValue());
  }

  public onCancel() {
    this.dialogRef.close();
  }
}
