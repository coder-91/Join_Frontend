import { Component } from '@angular/core';
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {DialogService} from "../../../../services/dialog.service";

@Component({
  selector: 'app-contact-details',
  standalone: true,
    imports: [
        MatButton,
        MatIcon,
        MatIconButton
    ],
  templateUrl: './contact-details.component.html',
  styleUrl: './contact-details.component.scss'
})
export class ContactDetailsComponent {

  constructor(private dialogService: DialogService) {
  }

  public editContact() {
  }

  public deleteContact() {
    this.dialogService
      .confirmDialog({
        title: 'Delete contact?',
        message: 'Are you sure you want to delete this contact?',
        confirmCaption: 'Yes',
        cancelCaption: 'No',
      })
      .subscribe((yes) => {
        if (yes) {
          console.log('The user said YES');
        }
      });
  }

}
