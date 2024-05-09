export interface TaskSummary {
  toDoTasks: number;
  inProgressTasks: number;
  awaitingFeedbackTasks: number;
  doneTasks: number;
  urgentTasks: number;
  closestUrgentDeadline: Date | null;
  totalTasks: number;
}
