import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Subtask} from "../../models/entity/subtask";
import {DtoMapperService} from "../dtoMapperService/dto-mapper.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SubtaskHttpService} from "./subtask-http.service";
import {SubtaskDto} from "../../models/dtos/subtask-dto";
import {SNACKBAR_DURATION} from "../../utils/constants";

@Injectable({
  providedIn: 'root'
})
export class SubtaskService {
  private _subtasks$: BehaviorSubject<Subtask[]> = new BehaviorSubject<Subtask[]>([]);
  constructor(private subtaskHttpService: SubtaskHttpService, private dtoMapperService: DtoMapperService, private matSnackBar: MatSnackBar) {
    this.fetchSubtasks();
  }

  public fetchSubtasks() {
    this.subtaskHttpService.fetchSubtasks().subscribe({
      next: (subtaskDtos: SubtaskDto[]) => {
        const subtasks = subtaskDtos.map(subtaskDto => this.dtoMapperService.mapSubtaskDtoToSubtask(subtaskDto));
        this._subtasks$.next(subtasks);
      }
    })
  }

  public get subtasks$(): Observable<Subtask[]> {
    return this._subtasks$.asObservable();
  }

  public get subtasks(): Subtask[] {
    return this._subtasks$.getValue();
  }

  public set subtasks(subtasks: Subtask[]) {
    this._subtasks$.next(subtasks);
  }

  public createSubtask(subtask: Subtask) {
    this.subtaskHttpService.createSubtask(this.dtoMapperService.mapSubtaskToSubtaskDto(subtask)).subscribe({
      next:(subtaskDto) => {
        const subtask = this.dtoMapperService.mapSubtaskDtoToSubtask(subtaskDto);
        this._subtasks$.next([...this.subtasks, subtask]);
        this.matSnackBar.open(`Subtask has been created successfully!`,'', {duration: SNACKBAR_DURATION});
      },
      error:(err) => {
        this.matSnackBar.open('Subtask creation failed.', 'Ok');
      }
    })
  }

  public updateSubtask(subtask: Subtask) {
    this.subtaskHttpService.updateSubtask(this.dtoMapperService.mapSubtaskToSubtaskDto(subtask)).subscribe({
      next: (subtaskDto: SubtaskDto) => {
        const updatedSubtask = this.dtoMapperService.mapSubtaskDtoToSubtask(subtaskDto);
        const subtaskIndex = this.subtasks.findIndex((subtask) => subtask.id === subtask.id);
        if (subtaskIndex > -1) {
          this.subtasks[subtaskIndex] = updatedSubtask;
        }

        this._subtasks$.next([...this.subtasks]);
        this.matSnackBar.open(`Subtask has been updated successfully!`,'', {duration: SNACKBAR_DURATION});
      },
      error:(err) => {
        this.matSnackBar.open('Subtask updating failed.', 'Ok');
      }
    })
  }

  public deleteSubtask(subtaskId: number) {
    this.subtaskHttpService.deleteSubtask(subtaskId).subscribe({
      next: () => {
        const tmp = this.subtasks;

        const index = this.subtasks.findIndex((subtask) => subtask.id === subtaskId);
        if (index > -1) {
          tmp.splice(index, 1);
          this.matSnackBar.open(`Subtask has been deleted successfully!`,'', {duration: SNACKBAR_DURATION});
        }
        this._subtasks$.next(tmp);
      },
      error:(err) => {
        this.matSnackBar.open('Subtask deletion failed.', 'Ok');
      }
    })
  }
}
