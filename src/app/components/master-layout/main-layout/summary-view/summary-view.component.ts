import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {TaskService} from "../../../../services/taskService/task.service";
import {TaskSummary} from "../../../../models/interfaces/task-summary";
import {DatePipe} from "@angular/common";
import {UserService} from "../../../../services/userService/user.service";
import {getGreetingByTime$} from "../../../../utils/date-utils";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-summary-view',
  standalone: true,
  imports: [
    MatIcon,
    DatePipe
  ],
  templateUrl: './summary-view.component.html',
  styleUrl: './summary-view.component.scss'
})
export class SummaryViewComponent implements OnInit, OnDestroy {
  taskSummary!: TaskSummary;
  greetingByTime:string = '';
  greetingByTimeSubscription!: Subscription;

  constructor(public taskService: TaskService, public userService: UserService) {}



  ngOnInit() {
    //TODO als Observable?
    this.taskSummary = this.taskService.getTaskSummary()
    this.greetingByTimeSubscription = getGreetingByTime$().subscribe(greetingByTime => {
      this.greetingByTime = greetingByTime;
    })
  }

  ngOnDestroy() {
    this.greetingByTimeSubscription.unsubscribe()
  }
}
