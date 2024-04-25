import {Component, Inject} from '@angular/core';
import {Contact} from "../../../../models/entity/contact";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatError, MatLabel} from "@angular/material/form-field";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact-form',
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
    MatIconModule
  ],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss'
})
export class ContactFormComponent {
  contactForm: FormGroup;

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<ContactFormComponent>, @Inject(MAT_DIALOG_DATA) public contact: Contact) {
    this.contactForm = this.fb.group({
      id: this.contact?.id,
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phoneNumber: new FormControl('', [Validators.required]),
    });

    if (this.contact) {
      this.contactForm.patchValue(this.contact);
    }
  }

  public onSubmit() {
    if (this.contact) {
      this.updateContact();
    } else {
      this.createContact();
    }
    this.contactForm.reset();
  }

  public createContact() {
    this.dialogRef.close(this.contactForm.getRawValue());
  }

  public updateContact() {
    this.dialogRef.close(this.contactForm.getRawValue());
  }

  public onCancel() {
    this.dialogRef.close();
  }
}
