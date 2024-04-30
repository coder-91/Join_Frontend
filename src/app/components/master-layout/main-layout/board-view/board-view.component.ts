import { Component } from '@angular/core';
import {MatSuffix} from "@angular/material/form-field";
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {filter} from "rxjs";
import {TaskViewComponent} from "../task-view/task-view.component";
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
@Component({
  selector: 'app-board-view',
  standalone: true,
  imports: [
    MatDialogModule,
    MatSuffix,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './board-view.component.html',
  styleUrl: './board-view.component.scss'
})
export class BoardViewComponent {
  searchValue:string="";

  constructor(public dialog: MatDialog) {}
  public addTaskDialog() {
    this.dialog.open(TaskViewComponent, {
      panelClass: ["mat-mdc-dialog-actions"],
      data: { fromPopup: true },
      //data: this.contact,
    }).afterClosed().pipe(filter((task) => task)).subscribe(task => {
      // TODO Create task
      console.log(task);
    });
  }
}
