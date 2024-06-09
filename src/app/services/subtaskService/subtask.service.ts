import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Subtask} from "../../models/entity/subtask";

@Injectable({
  providedIn: 'root'
})
export class SubtaskService {
  private _subtasks$: BehaviorSubject<Subtask[] | undefined> = new BehaviorSubject<Subtask[] | undefined>(undefined);
  constructor() { }

  public updateSubtask(subtask: Subtask, isDone: boolean) {
    subtask.isDone = isDone
    console.log(subtask);
  }
}
