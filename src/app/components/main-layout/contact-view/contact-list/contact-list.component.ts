import { Component } from '@angular/core';
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIconModule} from '@angular/material/icon';
import {MatList, MatListItem} from "@angular/material/list";
import {MatDivider} from "@angular/material/divider";
import {MatDialog} from "@angular/material/dialog";
import {ContactFormComponent} from "../contact-form/contact-form.component";
import {Contact} from "../../../../models/entity/contact";

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

  contact: Contact = {id: 1, email:'aaa@aaa.de', name:'Firstname Lastname', phoneNumber:'123456789'}
  constructor(public dialog: MatDialog) {

  }

  public createContactDialog() {
    this.dialog.open(ContactFormComponent, {
      //data: this.contact,
    }).afterClosed().subscribe(contact => {
      // TODO Create contact
      console.log(contact);
    });
  }
}
