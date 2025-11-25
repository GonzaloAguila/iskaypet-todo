const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

export const TASK_ROUTES = {
  GET_TASKS: `${API_BASE_URL}/todos`,
  GET_TASK_BY_ID: (id: number) => `${API_BASE_URL}/todos/${id}`,
  CREATE_TASK: `${API_BASE_URL}/todos`,
  DELETE_TASK: (id: number) => `${API_BASE_URL}/todos/${id}`,
} as const;

