import {UserDto} from "./user-dto";
import {TaskDto} from "./task-dto";

export interface TaskReceiveDto extends TaskDto {
  users: UserDto[]
}
