import { Contact } from './contact';
import {Priority} from "../enums/priority";
import {Category} from "../enums/category";
export interface Task {
  id: number,
  title: string,
  description: string,
  contacts: Contact[],
  dueDate: Date,
  prio: Priority,
  category: Category
}
