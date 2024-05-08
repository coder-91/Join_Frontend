import {Component} from '@angular/core';
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIconModule} from '@angular/material/icon';
import {MatList, MatListItem} from "@angular/material/list";
import {MatDivider} from "@angular/material/divider";
import {MatDialog} from "@angular/material/dialog";
import {ContactDialogService} from "../../../../../services/contactService/contact-dialog.service";
import {Contact} from "../../../../../models/entity/contact";
import {ContactService} from "../../../../../services/contactService/contact.service";
import {ContactComponent} from "./contact/contact.component";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [
    MatButton,
    MatIconModule,
    MatList,
    MatListItem,
    MatDivider,
    MatIconButton,
    ContactComponent,
    NgClass
  ],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.scss'
})
export class ContactListComponent{
  protected readonly Object = Object;
  groupedAndSortedContacts: { [key: string]: Contact[] };

  constructor(private contactService:ContactService ,private contactDialogService: ContactDialogService ,public dialog: MatDialog) {
    this.groupedAndSortedContacts = this.contactService.groupAndSortContacts(this.contactService.contacts);
  }

  public onCreateContact() {
    this.contactDialogService.createContactDialog();
  }
}
