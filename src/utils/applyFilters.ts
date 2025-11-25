import type { Task, GetTasksParams } from '../services/taskService/task.model';

export function applyFilters(tasks: Task[], params: GetTasksParams): Task[] {
  let filtered = [...tasks];

  if (params.filters?.completed !== undefined) {
    filtered = filtered.filter(task => task.completed === params.filters?.completed);
  }

  if (params.filters?.userId !== undefined) {
    filtered = filtered.filter(task => task.userId === params.filters?.userId);
  }

  if (params.search) {
    const searchLower = params.search.toLowerCase();
    filtered = filtered.filter(task =>
      task.title.toLowerCase().includes(searchLower)
    );
  }

  return filtered;
}