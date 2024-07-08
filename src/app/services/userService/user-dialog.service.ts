import {Injectable} from "@angular/core";
import {UserFormComponent} from "../../components/master-layout/alternate-layout/user-view/user-form/user-form.component";
import {filter} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {UserService} from "./user.service";
import {DialogService} from "../dialogService/dialog.service";
import {User} from "../../models/entity/user";

@Injectable({
  providedIn: 'root'
})
export class UserDialogService {
  constructor(private dialog: MatDialog, private userService: UserService, private dialogService: DialogService) {}

  public updateUserDialog(user: User) {
    this.dialog.open(UserFormComponent, {
      data: user,
    }).afterClosed().pipe(filter((user) => user)).subscribe(user => {
      this.userService.updateUser(user);
    });
  }

  public deleteUserDialog(userId: number) {
    this.dialogService
      .confirmDialog({
        title: 'Delete user?',
        message: 'Are you sure you want to delete this user?',
        confirmCaption: 'Yes',
        cancelCaption: 'No',
      })
      .subscribe((yes) => {
        if (yes) {
          this.userService.deleteUser(userId)
        }
      });
  }
}
