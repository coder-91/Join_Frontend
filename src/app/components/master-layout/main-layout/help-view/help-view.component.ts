import { Component } from '@angular/core';
import { Location } from '@angular/common';
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {CONTACT_DATA} from "../../../../constants/contact-data";

@Component({
  selector: 'app-help-view',
  standalone: true,
  imports: [
    MatIcon,
    MatIconButton
  ],
  templateUrl: './help-view.component.html',
  styleUrl: './help-view.component.scss'
})
export class HelpViewComponent {
  contactData = CONTACT_DATA;
  constructor(private location: Location) {}

  public goToPreviousPage() {
    this.location.back();
  }
}
