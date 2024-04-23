import { Component } from '@angular/core';
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIconModule} from '@angular/material/icon';
import {MatList, MatListItem} from "@angular/material/list";
import {MatDivider} from "@angular/material/divider";

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [
    MatButton,
    MatIconModule,
    MatList,
    MatListItem,
    MatDivider,
    MatIconButton
  ],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.scss'
})
export class ContactListComponent {

  public createNewContact() {

  }
}
