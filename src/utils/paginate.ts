import { Task } from "../services/taskService/task.model";

export const paginate = (tasks: Task[], page: number, limit: number): Task[] => {
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    return tasks.slice(startIndex, endIndex);
}