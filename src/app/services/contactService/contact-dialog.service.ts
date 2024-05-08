import {Injectable} from "@angular/core";
import {ContactFormComponent} from "../../components/master-layout/alternate-layout/contact-view/contact-form/contact-form.component";
import {filter} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {ContactService} from "./contact.service";
import {DialogService} from "../dialogService/dialog.service";
import {Contact} from "../../models/entity/contact";

@Injectable({
  providedIn: 'root'
})
export class ContactDialogService {
  constructor(private dialog: MatDialog, private contactService: ContactService, private dialogService: DialogService) {}

  public createContactDialog() {
    this.dialog.open(ContactFormComponent, {
    }).afterClosed().pipe(filter((contact) => contact)).subscribe(contact => {
      this.contactService.createContact(contact);
    });
  }

  public editContactDialog(contact: Contact) {
    this.dialog.open(ContactFormComponent, {
      data: contact,
    }).afterClosed().pipe(filter((contact) => contact)).subscribe(contact => {
      this.contactService.editContact(contact);
    });
  }

  public deleteContactDialog(contactId: number) {
    this.dialogService
      .confirmDialog({
        title: 'Delete contact?',
        message: 'Are you sure you want to delete this contact?',
        confirmCaption: 'Yes',
        cancelCaption: 'No',
      })
      .subscribe((yes) => {
        if (yes) {
          this.contactService.deleteContact(contactId)
        }
      });
  }
}
