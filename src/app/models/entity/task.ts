import { Contact } from './contact';
import {Prio} from "../enums/prio";
import {Category} from "../enums/category";
export interface Task {
  id: number,
  title: string,
  description: string,
  contacts: Contact[],
  dueDate: Date,
  prio: Prio,
  category: Category
}
