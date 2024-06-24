import { Injectable } from '@angular/core';
import { Task } from '../../models/entity/task';
import {TaskDto} from "../../models/dtos/task-dto";
import {CATEGORIES, PRIORITIES, TASK_STATUSES} from "../taskService/task-constants";

@Injectable({
  providedIn: 'root'
})
export class DtoMapperService {
  constructor() { }

  public mapTaskToTaskDto(task: Task): TaskDto {
    return {
      id: task.id,
      title: task.title,
      description: task.description,
      dueTo: task.dueTo,
      created: task.created,
      updated: task.updated,
      priority: task.priority.key,
      category: task.category.key,
      subtasks: task.subtasks,
      users: task.users,
      status: task.status.key
    }
  }

  public mapTaskDtoToTask(taskDto: TaskDto): Task {
    return {
      id: taskDto.id,
      title: taskDto.title,
      description: taskDto.description,
      dueTo: taskDto.dueTo,
      created: taskDto.created,
      updated: taskDto.updated,
      priority: PRIORITIES[taskDto.priority],
      category: CATEGORIES[taskDto.category],
      subtasks: taskDto.subtasks,
      users: taskDto.users,
      status: TASK_STATUSES[taskDto.status]
    }
  }
}
