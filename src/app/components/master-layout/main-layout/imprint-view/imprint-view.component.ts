import { Component } from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {Location} from "@angular/common";

@Component({
  selector: 'app-imprint-view',
  standalone: true,
    imports: [
        MatIcon
    ],
  templateUrl: './imprint-view.component.html',
  styleUrl: './imprint-view.component.scss'
})
export class ImprintViewComponent {
  constructor(private location: Location) {}

  public goToPreviousPage() {
    this.location.back();
  }
}
