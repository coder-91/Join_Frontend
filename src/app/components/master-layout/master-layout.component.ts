import { Component } from '@angular/core';
import {HeaderComponent} from "../shared/header/header.component";
import {NavigationComponent} from "../shared/navigation/navigation.component";
import {RouterOutlet} from "@angular/router";
import {ScrollResetDirective} from "../../directives/scrollReset/scroll-reset.directive";

@Component({
  selector: 'app-master-layout',
  standalone: true,
  imports: [
    HeaderComponent,
    NavigationComponent,
    RouterOutlet,
    ScrollResetDirective
  ],
  templateUrl: './master-layout.component.html',
  styleUrl: './master-layout.component.scss'
})
export class MasterLayoutComponent {

}
