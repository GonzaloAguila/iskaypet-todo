import { renderHook, waitFor } from '@testing-library/react';
import { useTasks } from './useTasks';
import type { Task } from '@/src/services/taskService/task.model';

const mockTasks: Task[] = [
  { id: 1, userId: 1, title: 'Task 1', completed: false },
  { id: 2, userId: 1, title: 'Task 2', completed: true },
  { id: 3, userId: 2, title: 'Task 3', completed: false },
];

describe('useTasks', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockTasks,
    });
  });

  it('should fetch tasks on mount', async () => {
    const { result } = renderHook(() => useTasks());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.tasks).toHaveLength(3);
    expect(result.current.total).toBe(3);
  });

  it('should apply limit param', async () => {
    const { result } = renderHook(() => useTasks({ params: { limit: 2 } }));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.tasks.length).toBe(2);
    expect(result.current.limit).toBe(2);
  });

  it('should return pagination info', async () => {
    const { result } = renderHook(() => useTasks({ params: { limit: 2 } }));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.page).toBe(1);
    expect(result.current.pages).toBe(2);
    expect(result.current.total).toBe(3);
    expect(result.current.limit).toBe(2);
  });

  it('should expose createTask function', async () => {
    const { result } = renderHook(() => useTasks());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(typeof result.current.createTask).toBe('function');
  });

  it('should expose deleteTask function', async () => {
    const { result } = renderHook(() => useTasks());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(typeof result.current.deleteTask).toBe('function');
  });

  it('should expose refetch function', async () => {
    const { result } = renderHook(() => useTasks());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(typeof result.current.refetch).toBe('function');
  });
});
