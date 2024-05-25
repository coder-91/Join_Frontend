import {Subtask} from "../entity/subtask";
import {Contact} from "../entity/contact";

export interface TaskDto {
  id: number,
  title: string,
  description: string,
  dueTo: Date,
  created: Date,
  updated: Date,
  priority: string,
  category: string,
  subtasks: Subtask[],
  contacts: Contact[],
  status: string
}
