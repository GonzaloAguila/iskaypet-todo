'use client';

import { useState } from 'react';
import Task from '../../../../modules/Task';
import { useTasks, useModal } from '@/src/hooks';
import styles from './MyTasks.module.css';
import Button from '../../../../components/Button';
import CreateTaskModal from '@/src/modules/modals/CreateTaskModal';
import ErrorMessage from '@/src/components/ErrorMessage';
import type { TaskFormData } from '@/src/modules/forms/TaskForm';

export default function TasksList() {
  const modal = useModal();
  const { tasks, error, createTask, deleteTask, refetch } = useTasks({ params: { limit: 3 } });
  const [actionError, setActionError] = useState<Error | null>(null);

  const handleDelete = async (id: number) => {
    setActionError(null);
    try {
      await deleteTask(id);
    } catch (err) {
      setActionError(err instanceof Error ? err : new Error('Error al eliminar tarea'));
    }
  };

  const handleAddTask = async (data: TaskFormData) => {
    setActionError(null);
    await createTask({
      title: data.name,
      userId: 1,
      completed: false,
    });
  };

  if (error) {
    return (
      <ErrorMessage
        error={error}
        title="Error al cargar las tareas"
        onRetry={refetch}
      />
    );
  }

  return (
    <div className={styles.tasksList}>
      {actionError && (
        <ErrorMessage error={actionError} variant="inline" />
      )}
      {tasks.length === 0 ? (
        <div className={styles.noTasks}>No hay tareas disponibles</div>
      ) : (
        tasks.map((task) => (
        <Task
          key={task.id}
          title={task.title}
          onDelete={() => handleDelete(task.id)}
        />
        ))
      )}
      <Button label="Agregar tarea" onClick={modal.open} />
      <CreateTaskModal
        isOpen={modal.isOpen}
        onClose={modal.close}
        onSuccess={handleAddTask}
      />
    </div>
  );
}
