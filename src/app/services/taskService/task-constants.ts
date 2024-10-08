import {Category} from "../../models/interfaces/category";
import {TaskStatus} from "../../models/interfaces/task-status";
import {Priority} from "../../models/interfaces/priority";


export const CATEGORIES: { [key: string]: Category } = {
  TECHNICAL_TASK: {
    key: 'TECHNICAL_TASK',
    value: 'Technical Task',
    color: '#1FD7C1'
  },
  USER_STORY: {
    key: 'USER_STORY',
    value: 'User Story',
    color: '#0038FF'
  }
};
export const TASK_STATUSES: {[key: string]: TaskStatus } = {
  TO_DO: {
    key: 'TO_DO',
    value: 'To Do',
  },
  IN_PROGRESS: {
    key: 'IN_PROGRESS',
    value: 'In Progress',
  },
  AWAIT_FEEDBACK: {
    key: 'AWAIT_FEEDBACK',
    value: 'Await Feedback',
  },
  DONE: {
    key: 'DONE',
    value: 'Done',
  }
}
export const PRIORITIES: {[key: string]: Priority } = {
  LOW: {
    key: 'LOW',
    value: 'Low',
    color: '#7AE229',
    icon: 'keyboard_double_arrow_down',
  },
  MEDIUM: {
    key: 'MEDIUM',
    value: 'Medium',
    color: '#FFA800',
    icon: 'keyboard_double_arrow_right',
  },
  URGENT: {
    key: 'URGENT',
    value: 'Urgent',
    color: '#FF7A50',
    icon: 'keyboard_double_arrow_up',
  },
}
