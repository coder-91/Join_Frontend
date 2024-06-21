import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {AsyncPipe} from "@angular/common";
import {LoadingService} from "./services/loadingService/loading.service";
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import {SpinnerComponent} from "./components/shared/spinner/spinner.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatProgressSpinnerModule, AsyncPipe, HttpClientModule, CommonModule, SpinnerComponent],
  providers: [

  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Join Frontend';
  loading$ = this.loadingService.loading$;

  constructor(private loadingService: LoadingService) {}
}
