import { Contact } from './contact';
import {Priority} from "../enums/priority";
import {Category} from "../enums/category";
import {Subtask} from "./subtask";
export interface Task {
  id: number,
  title: string,
  description: string,
  contacts: Contact[],
  dueTo: Date,
  created: Date,
  updated: Date,
  priority: Priority,
  category: Category,
  subtasks: Subtask[]
}
