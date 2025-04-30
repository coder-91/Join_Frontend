import { Component } from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {Location} from "@angular/common";

@Component({
  selector: 'app-privacy-policy-view',
  standalone: true,
  imports: [
    MatIcon
  ],
  templateUrl: './privacy-policy-view.component.html',
  styleUrl: './privacy-policy-view.component.scss'
})
export class PrivacyPolicyViewComponent {
  constructor(private location: Location) {}

  public goToPreviousPage() {
    this.location.back();
  }
}
