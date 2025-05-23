import { Component } from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {Location} from "@angular/common";
import {CONTACT_DATA} from "../../../../constants/contact-data";

@Component({
  selector: 'app-legal-notice-view',
  standalone: true,
    imports: [
        MatIcon
    ],
  templateUrl: './legal-notice-view.component.html',
  styleUrl: './legal-notice-view.component.scss'
})
export class LegalNoticeViewComponent {
  contactData = CONTACT_DATA;
  constructor(private location: Location) {}

  public goToPreviousPage() {
    this.location.back();
  }
}
