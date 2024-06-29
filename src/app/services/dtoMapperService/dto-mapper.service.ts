import { Injectable } from '@angular/core';
import { Task } from '../../models/entity/task';
import {CATEGORIES, PRIORITIES, TASK_STATUSES} from "../taskService/task-constants";
import {User} from "../../models/entity/user";
import {UserDto} from "../../models/dtos/user-dto";
import {Subtask} from "../../models/entity/subtask";
import {SubtaskDto} from "../../models/dtos/subtask-dto";
import {TaskSendDto} from "../../models/dtos/task-send-dto";
import {TaskReceiveDto} from "../../models/dtos/task-receive-dto";

@Injectable({
  providedIn: 'root'
})
export class DtoMapperService {
  constructor() { }

  public mapUserToUserDto(user: User): UserDto {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      phone_number: user.phoneNumber,
      password: user.password,
      avatar_color: user.avatarColor
    }
  }

  public mapUserDtoToUser(userDto: UserDto): User {
    return {
      id: userDto.id,
      email: userDto.email,
      name: userDto.name,
      phoneNumber: userDto.phone_number,
      password: userDto.password,
      avatarColor: userDto.avatar_color
    }
  }

  public mapTaskToTaskSendDto(task: Task): TaskSendDto {
    return {
      id: task.id,
      title: task.title,
      description: task.description,
      due_to: task.dueTo,
      created: task.created,
      updated: task.updated,
      priority: task.priority.key,
      category: task.category.key,
      status: task.status.key,
      subtasks: task.subtasks?.map(subtask => this.mapSubtaskToSubtaskDto(subtask)),
      users: task.users?.map(user => user.id)
    }
  }

  public mapTaskReceiveDtoToTask(taskReceiveDto: TaskReceiveDto): Task {
    return {
      id: taskReceiveDto.id,
      title: taskReceiveDto.title,
      description: taskReceiveDto.description,
      dueTo: taskReceiveDto.due_to,
      created: taskReceiveDto.created,
      updated: taskReceiveDto.updated,
      priority: PRIORITIES[taskReceiveDto.priority],
      category: CATEGORIES[taskReceiveDto.category],
      status: TASK_STATUSES[taskReceiveDto.status],
      subtasks: taskReceiveDto.subtasks?.map(subtask => this.mapSubtaskDtoToSubtask(subtask)),
      users: taskReceiveDto.users?.map(user => this.mapUserDtoToUser(user))
    }
  }

  public mapSubtaskToSubtaskDto(subtask: Subtask): SubtaskDto {
    return{
      id: subtask.id,
      task_id: subtask.taskId,
      description: subtask.description,
      is_done: subtask.isDone
    }
  }

  public mapSubtaskDtoToSubtask(subtaskDto: SubtaskDto): Subtask {
    return{
      id: subtaskDto.id,
      taskId: subtaskDto.task_id,
      description: subtaskDto.description,
      isDone: subtaskDto.is_done
    }
  }
}
