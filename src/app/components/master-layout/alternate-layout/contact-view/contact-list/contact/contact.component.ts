import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Contact} from "../../../../../../models/entity/contact";
import {MatListItem} from "@angular/material/list";
import {getInitials} from "../../../../../../utils/helpers";
import {NgClass, NgStyle} from "@angular/common";
import {ContactService} from "../../../../../../services/contactService/contact.service";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {BreakpointObserver, BreakpointState} from "@angular/cdk/layout";

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    MatListItem,
    NgStyle,
    NgClass
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements OnInit, OnDestroy {
  @Input() contact!: Contact;
  protected readonly getInitials = getInitials;
  selectedContact: Contact | undefined;
  selectedContactSubscription!: Subscription;
  private breakpointSubscription!: Subscription;

  constructor(private contactService: ContactService, private router: Router, private breakpointObserver: BreakpointObserver,) {
  }

  ngOnInit() {
    this.selectedContactSubscription = this.contactService.selectedContact$.subscribe(contact => {
      this.selectedContact = contact;
    });
  }

  ngOnDestroy(): void {
    this.selectedContactSubscription.unsubscribe();
    if(this.breakpointSubscription) {
      this.breakpointSubscription.unsubscribe();
    }
  }

  public onSelectContact(contact: Contact) {
    this.contactService.selectedContact = contact;

    this.breakpointSubscription = this.breakpointObserver.observe([
      "(max-width: 992px)"
    ]).subscribe((result: BreakpointState) => {
      if (result.matches) {
        this.router.navigate(['contacts-details']).then(r => {})
      } else {
        this.router.navigate(['contacts']).then(r =>{})
      }
    });
  }
}
