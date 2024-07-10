import { Component } from '@angular/core';
import { Location } from '@angular/common';
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";

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
  constructor(private location: Location) {}

  public goToPreviousComponent() {
    this.location.back();
  }
}
