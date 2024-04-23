import { Component } from '@angular/core';
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";

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

  public editContact() {
  }

  public deleteContact() {
  }

}
