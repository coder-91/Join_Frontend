export interface SubtaskDto {
  id: number,
  task_id: number | undefined,
  description: string,
  is_done: boolean
}
