import { Component } from '@angular/core';
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-alternate-layout',
  standalone: true,
  imports: [
    RouterOutlet
  ],
  templateUrl: './alternate-layout.component.html',
  styleUrl: './alternate-layout.component.scss'
})
export class AlternateLayoutComponent {

}
