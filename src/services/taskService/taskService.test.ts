import { getTasksClient, getTaskByIdClient, createTaskClient, deleteTaskClient } from './taskService';
import type { Task } from './task.model';

const mockTasks: Task[] = [
  { id: 1, userId: 1, title: 'Task 1', completed: false },
  { id: 2, userId: 1, title: 'Task 2', completed: true },
  { id: 3, userId: 2, title: 'Task 3', completed: false },
  { id: 4, userId: 2, title: 'Another task', completed: true },
  { id: 5, userId: 1, title: 'Search me', completed: false },
];

describe('taskService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getTasksClient', () => {
    it('fetches all tasks successfully', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockTasks,
      });

      const result = await getTasksClient();

      expect(global.fetch).toHaveBeenCalledWith(
        'https://jsonplaceholder.typicode.com/todos'
      );
      expect(result.data.length).toBeLessThanOrEqual(10);
      expect(result.total).toBe(5);
    });

    it('applies limit parameter', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockTasks,
      });

      const result = await getTasksClient({ limit: 2 });

      expect(result.data).toHaveLength(2);
      expect(result.limit).toBe(2);
      expect(result.pages).toBe(3);
    });

    it('applies page parameter', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockTasks,
      });

      const result = await getTasksClient({ limit: 2, page: 2 });

      expect(result.data).toHaveLength(2);
      expect(result.page).toBe(2);
      expect(result.data[0].id).toBe(3);
    });

    it('filters by completed status', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockTasks,
      });

      const result = await getTasksClient({ 
        filters: { completed: true },
        limit: 10 
      });

      expect(result.data.every(task => task.completed)).toBe(true);
      expect(result.total).toBe(2);
    });

    it('filters by userId', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockTasks,
      });

      const result = await getTasksClient({ 
        filters: { userId: 1 },
        limit: 10 
      });

      expect(result.data.every(task => task.userId === 1)).toBe(true);
      expect(result.total).toBe(3);
    });

    it('searches by title', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockTasks,
      });

      const result = await getTasksClient({ search: 'search', limit: 10 });

      expect(result.data).toHaveLength(1);
      expect(result.data[0].title).toBe('Search me');
    });

    it('throws error when fetch fails', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        statusText: 'Internal Server Error',
        status: 500,
      });

      await expect(getTasksClient()).rejects.toThrow('Error al obtener tareas');
    });
  });

  describe('getTaskByIdClient', () => {
    it('fetches a single task by id', async () => {
      const mockTask = { id: 1, userId: 1, title: 'Task 1', completed: false };
      
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockTask,
      });

      const result = await getTaskByIdClient(1);

      expect(global.fetch).toHaveBeenCalledWith(
        'https://jsonplaceholder.typicode.com/todos/1'
      );
      expect(result).toEqual(mockTask);
    });

    it('throws error when task not found', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        statusText: 'Not Found',
        status: 404,
      });

      await expect(getTaskByIdClient(999)).rejects.toThrow('Error al obtener tarea 999');
    });
  });

  describe('createTaskClient', () => {
    it('creates a new task', async () => {
      const newTask = { id: 201, userId: 1, title: 'New Task', completed: false };
      
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => newTask,
      });

      const result = await createTaskClient({ title: 'New Task', userId: 1 });

      expect(global.fetch).toHaveBeenCalledWith(
        'https://jsonplaceholder.typicode.com/todos',
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-type': 'application/json; charset=UTF-8' },
        })
      );
      expect(result).toEqual(newTask);
    });

    it('sets completed to false by default', async () => {
      const newTask = { id: 201, userId: 1, title: 'New Task', completed: false };
      
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => newTask,
      });

      await createTaskClient({ title: 'New Task', userId: 1 });

      const callArgs = (global.fetch as jest.Mock).mock.calls[0];
      const body = JSON.parse(callArgs[1].body);
      expect(body.completed).toBe(false);
    });

    it('throws error when creation fails', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        statusText: 'Bad Request',
        status: 400,
      });

      await expect(createTaskClient({ title: 'New Task', userId: 1 }))
        .rejects.toThrow('Error al crear tarea');
    });
  });

  describe('deleteTaskClient', () => {
    it('deletes a task', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
      });

      await deleteTaskClient(1);

      expect(global.fetch).toHaveBeenCalledWith(
        'https://jsonplaceholder.typicode.com/todos/1',
        { method: 'DELETE' }
      );
    });

    it('throws error when deletion fails', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        statusText: 'Not Found',
        status: 404,
      });

      await expect(deleteTaskClient(999)).rejects.toThrow('Error al eliminar tarea 999');
    });
  });
});

