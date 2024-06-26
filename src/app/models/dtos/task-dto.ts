import {Subtask} from "../entity/subtask";
import {User} from "../entity/user";

export interface TaskDto {
  id: number,
  title: string,
  description: string,
  due_to: Date,
  created: Date,
  updated: Date,
  priority: string,
  category: string,
  subtasks: Subtask[],
  users: User[],
  status: string
}
