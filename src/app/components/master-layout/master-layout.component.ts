import { Component } from '@angular/core';
import {HeaderComponent} from "../shared/header/header.component";
import {NavigationComponent} from "../shared/navigation/navigation.component";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-master-layout',
  standalone: true,
    imports: [
        HeaderComponent,
        NavigationComponent,
        RouterOutlet
    ],
  templateUrl: './master-layout.component.html',
  styleUrl: './master-layout.component.scss'
})
export class MasterLayoutComponent {

}
