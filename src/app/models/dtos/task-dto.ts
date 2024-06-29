import {SubtaskDto} from "./subtask-dto";

export interface TaskDto {
  id: number,
  title: string,
  description: string,
  due_to: Date,
  created: Date,
  updated: Date,
  priority: string,
  category: string,
  status: string,
  subtasks: SubtaskDto[],
}
