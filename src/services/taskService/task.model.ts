export interface Task {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface CreateTaskPayload {
  title: string;
  userId: number;
  completed?: boolean;
}

export interface GetTasksParams {
  limit?: number;
  page?: number;
  search?: string;
  filters?: {
    completed?: boolean;
    userId?: number;
  };
}

export interface GetTasksResponse {
  data: Task[];
  total: number;
  pages: number;
  page: number;
  limit: number;
}