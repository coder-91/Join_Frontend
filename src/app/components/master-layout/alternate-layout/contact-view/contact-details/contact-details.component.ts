import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatMenuModule} from '@angular/material/menu';
import {Contact} from "../../../../../models/entity/contact";
import {ContactService} from "../../../../../services/contactService/contact.service";
import {getInitials} from "../../../../../utils/helpers";
import {Subscription} from "rxjs";
import {NgStyle} from "@angular/common";
import {ContactDialogService} from "../../../../../services/contactService/contact-dialog.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-contact-details',
  standalone: true,
  imports: [
    MatButton,
    MatIcon,
    MatIconButton,
    MatMenuModule,
    NgStyle
  ],
  templateUrl: './contact-details.component.html',
  styleUrl: './contact-details.component.scss'
})
export class ContactDetailsComponent implements OnInit, OnDestroy  {
  protected readonly getInitials = getInitials;
  selectedContact!: Contact;
  private selectedContactSubscription!: Subscription;
  constructor(private router: Router, private contactService: ContactService, private contactDialogService: ContactDialogService) {}

  ngOnInit(): void {
    this.selectedContactSubscription = this.contactService.selectedContact$.subscribe(contact => {
      this.selectedContact = contact;
    });
  }

  ngOnDestroy(): void {
    this.selectedContactSubscription.unsubscribe();
  }

  public onEditContact() {
    this.contactDialogService.editContactDialog(this.selectedContact);
  }

  public onDeleteContact() {
    this.contactDialogService.deleteContactDialog(this.selectedContact.id)
  }

  public backToPreviousComponent() {
    this.router.navigate(['contacts']).then(r =>{})
  }
}
