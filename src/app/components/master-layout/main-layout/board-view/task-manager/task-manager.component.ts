import { Component } from '@angular/core';
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatFormField, MatLabel, MatPrefix, MatSuffix} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {TaskViewComponent} from "../../task-view/task-view.component";
import {filter} from "rxjs";

@Component({
  selector: 'app-task-manager',
  standalone: true,
  imports: [
    MatButton,
    MatFormField,
    MatIcon,
    MatIconButton,
    MatInput,
    MatLabel,
    MatPrefix,
    MatSuffix,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './task-manager.component.html',
  styleUrl: './task-manager.component.scss'
})
export class TaskManagerComponent {
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
