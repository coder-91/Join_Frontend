import {TaskDto} from "./task-dto";

export interface TaskSendDto extends TaskDto {
  users: number[]
}
