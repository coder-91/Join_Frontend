import { Contact } from './contact';
import {Priority} from "../enums/priority";
import {Category} from "../enums/category";
import {Subtask} from "./subtask";
import {TaskStatus} from "../enums/task-status";
export interface Task {
  id: number,
  title: string,
  description: string,
  dueTo: Date,
  created: Date,
  updated: Date,
  priority: Priority,
  category: Category,
  subtasks: Subtask[],
  contacts: Contact[],
  status: TaskStatus
}
