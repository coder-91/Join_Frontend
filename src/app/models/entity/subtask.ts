export interface Subtask {
  id: number,
  taskId: number | undefined,
  description: string,
  isDone: boolean,
  isEditable: boolean
}
