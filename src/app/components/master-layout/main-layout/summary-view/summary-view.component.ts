import {Component, OnInit} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {TaskService} from "../../../../services/taskService/task.service";
import {TaskSummary} from "../../../../models/interfaces/task-summary";
import {DatePipe} from "@angular/common";

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
export class SummaryViewComponent implements OnInit {
  taskSummary!: TaskSummary;
  constructor(public taskService: TaskService) {}

  ngOnInit() {
    this.taskSummary = this.taskService.getTaskSummary()
  }
}
