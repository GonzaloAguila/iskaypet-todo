'use client';

import useSWR from 'swr';
import { 
  getTasksClient, 
  createTaskClient, 
  deleteTaskClient 
} from '@/src/services/taskService/taskService';
import type { 
  Task, 
  GetTasksParams, 
  GetTasksResponse, 
  CreateTaskPayload 
} from '@/src/services/taskService/task.model';

interface UseTasksOptions {
  params?: GetTasksParams;
}

interface UseTasksReturn {
  tasks: Task[];
  total: number;
  pages: number;
  page: number;
  limit: number;
  isLoading: boolean;
  error: Error | undefined;
  createTask: (payload: CreateTaskPayload) => Promise<Task>;
  deleteTask: (id: number) => Promise<void>;
  refetch: () => Promise<GetTasksResponse | undefined>;
}

const DEFAULT_PARAMS: GetTasksParams = { limit: 10 };

export function useTasks(options: UseTasksOptions = {}): UseTasksReturn {
  const { params = DEFAULT_PARAMS } = options;

  const { 
    data: response, 
    error, 
    isLoading,
    mutate 
  } = useSWR<GetTasksResponse>(
    ['tasks', params],
    () => getTasksClient(params),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateOnMount: true,
    }
  );

  const tasks = response?.data ?? [];
  const total = response?.total ?? 0;
  const pages = response?.pages ?? 0;
  const page = response?.page ?? 1;
  const limit = response?.limit ?? params.limit ?? 10;

  const createTask = async (payload: CreateTaskPayload): Promise<Task> => {
    const createdTask = await createTaskClient(payload);
    
    if (response) {
      await mutate(
        {
          ...response,
          data: [createdTask, ...tasks],
          total: response.total + 1,
          pages: Math.ceil((response.total + 1) / response.limit),
        },
        { revalidate: false }
      );
    }

    return createdTask;
  };

  const deleteTask = async (id: number): Promise<void> => {
    const previousResponse = response;

    // Optimistic update
    if (response) {
      const updatedTasks = tasks.filter((task) => task.id !== id);
      await mutate(
        {
          ...response,
          data: updatedTasks,
          total: response.total - 1,
          pages: Math.ceil((response.total - 1) / response.limit),
        },
        { revalidate: false }
      );
    }

    try {
      await deleteTaskClient(id);
    } catch (err) {
      // Rollback on error
      if (previousResponse) {
        await mutate(previousResponse, { revalidate: false });
      }
      throw err;
    }
  };

  const refetch = () => mutate();

  return {
    tasks,
    total,
    pages,
    page,
    limit,
    isLoading,
    error,
    createTask,
    deleteTask,
    refetch,
  };
}
