import { Contact } from './contact';
import {Priority} from "../interfaces/priority";
import {Category} from "../interfaces/category";
import {Subtask} from "./subtask";
import {TaskStatus} from "../interfaces/task-status";
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
