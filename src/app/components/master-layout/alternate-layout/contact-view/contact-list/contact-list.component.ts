import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIconModule} from '@angular/material/icon';
import {MatList, MatListItem} from "@angular/material/list";
import {MatDivider} from "@angular/material/divider";
import {ContactDialogService} from "../../../../../services/contactService/contact-dialog.service";
import {Contact} from "../../../../../models/entity/contact";
import {ContactService} from "../../../../../services/contactService/contact.service";
import {ContactComponent} from "./contact/contact.component";
import {NgClass} from "@angular/common";
import {Subscription} from "rxjs";

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
export class ContactListComponent implements OnInit, OnDestroy {
  protected readonly Object = Object;
  contacts!: Contact[];
  contactsSubscription!: Subscription;
  groupedAndSortedContacts!: { [key: string]: Contact[] };

  constructor(private contactService:ContactService, private contactDialogService: ContactDialogService) {}

  ngOnInit() {
    this.contactsSubscription = this.contactService.contacts$.subscribe(contacts => {
      this.contacts = contacts;
      this.groupedAndSortedContacts = this.contactService.groupAndSortContacts(this.contacts);
    });
  }

  ngOnDestroy() {
    this.contactsSubscription.unsubscribe();
  }

  public onCreateContact() {
    this.contactDialogService.createContactDialog();
  }
}
