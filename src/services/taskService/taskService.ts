import { TASK_ROUTES } from './taskRoutes';
import type { Task, GetTasksParams, GetTasksResponse, CreateTaskPayload } from './task.model';
import { applyFilters } from '../../utils/applyFilters';
import { paginate } from '../../utils/paginate';
import { throwAppErrorFromResponse, throwAppErrorFromError } from '../../utils/errors';

async function handleResponse<T>(response: Response, context: string): Promise<T> {
  if (!response.ok) {
    throwAppErrorFromResponse(response, context);
  }
  return response.json();
}

export async function getTasksClient(params: GetTasksParams = {}): Promise<GetTasksResponse> {
  try {
    const response = await fetch(TASK_ROUTES.GET_TASKS);
    const allTasks = await handleResponse<Task[]>(response, 'Error al obtener tareas');
    const filteredTasks = applyFilters(allTasks, params);

    const total = filteredTasks.length;
    const limit = params.limit || 10;
    const page = params.page || 1;
    const pages = Math.ceil(total / limit);
    const paginatedTasks = paginate(filteredTasks, page, limit);

    return {
      data: paginatedTasks,
      total,
      pages,
      page,
      limit,
    };
  } catch (error) {
    throwAppErrorFromError(error, 'Error al obtener tareas');
  }
}

export async function getTaskByIdClient(id: number): Promise<Task> {
  try {
    const response = await fetch(TASK_ROUTES.GET_TASK_BY_ID(id));
    return handleResponse<Task>(response, `Error al obtener tarea ${id}`);
  } catch (error) {
    throwAppErrorFromError(error, `Error al obtener tarea ${id}`);
  }
}

export async function createTaskClient(payload: CreateTaskPayload): Promise<Task> {
  try {
    const response = await fetch(TASK_ROUTES.CREATE_TASK, {
      method: 'POST',
      body: JSON.stringify({
        title: payload.title,
        userId: payload.userId,
        completed: payload.completed ?? false,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    return handleResponse<Task>(response, 'Error al crear tarea');
  } catch (error) {
    throwAppErrorFromError(error, 'Error al crear tarea');
  }
}

export async function deleteTaskClient(id: number): Promise<void> {
  try {
    const response = await fetch(TASK_ROUTES.DELETE_TASK(id), {
      method: 'DELETE',
    });
    if (!response.ok) {
      throwAppErrorFromResponse(response, `Error al eliminar tarea ${id}`);
    }
  } catch (error) {
    throwAppErrorFromError(error, `Error al eliminar tarea ${id}`);
  }
}
