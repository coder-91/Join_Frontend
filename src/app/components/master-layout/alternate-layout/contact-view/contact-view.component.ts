import { Component } from '@angular/core';
import {ContactListComponent} from "./contact-list/contact-list.component";
import {ContactDetailsComponent} from "./contact-details/contact-details.component";

@Component({
  selector: 'app-contact-view',
  standalone: true,
  imports: [
    ContactListComponent,
    ContactDetailsComponent
  ],
  templateUrl: './contact-view.component.html',
  styleUrl: './contact-view.component.scss'
})
export class ContactViewComponent {}
