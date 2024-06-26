import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {TaskService} from "../../../../services/taskService/task.service";
import {TaskSummary} from "../../../../models/interfaces/task-summary";
import {DatePipe} from "@angular/common";
import {UserService} from "../../../../services/userService/user.service";
import {getGreetingByTime$} from "../../../../utils/date-utils";
import {Subscription} from "rxjs";
import {User} from "../../../../models/entity/user";
import { Task } from '../../../../models/entity/task';

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
  loggedUser!: User;
  loggedUserSubscription!: Subscription;

  tasks!: Task[];
  tasksSubscription!: Subscription;
  constructor(public taskService: TaskService, public userService: UserService) {}

  ngOnInit() {
    this.loggedUserSubscription = this.userService.loggedUser$.subscribe(loggedUser => {
      this.loggedUser = loggedUser;
    })

    this.tasksSubscription = this.taskService.tasks$.subscribe(tasks => {
      this.tasks = tasks;

      if(this.tasks) {
        this.taskSummary = this.taskService.getTaskSummary(this.tasks)
      }

    });


    this.greetingByTimeSubscription = getGreetingByTime$().subscribe(greetingByTime => {
      this.greetingByTime = greetingByTime;
    })
  }

  ngOnDestroy() {
    this.greetingByTimeSubscription.unsubscribe();
    this.loggedUserSubscription.unsubscribe();
    this.tasksSubscription.unsubscribe();
  }
}
