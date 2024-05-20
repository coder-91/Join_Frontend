import {Injectable} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogData} from "../../models/dialog-data/confirm-dialog-data";
import {Observable} from "rxjs";
import {ConfirmDialogComponent} from "../../components/shared/confirm-dialog/confirm-dialog.component";

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  constructor(private dialog: MatDialog) {}

  public confirmDialog(data: ConfirmDialogData): Observable<boolean> {
    return this.dialog
      .open(ConfirmDialogComponent, {
        data,
        disableClose: true,
      })
      .afterClosed();
  }
}
