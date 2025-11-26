'use client';

import { useState, useEffect, useMemo } from 'react';
import Task from '../../../../modules/Task';
import { useTasks, useModal, usePagination, useToast } from '@/src/hooks';
import styles from './MyTasks.module.css';
import Button from '../../../../components/Button';
import CreateTaskModal from '@/src/modules/modals/CreateTaskModal';
import ErrorMessage from '@/src/components/ErrorMessage';
import Paginator from '@/src/modules/Paginator';
import ToastContainer from '@/src/modules/Toast';
import type { TaskFormData } from '@/src/modules/forms/TaskForm';

const INITIAL_LIMIT = 3;
const LIMIT_OPTIONS = [3, 5, 10];

export default function TasksList() {
  const modal = useModal();
  const pagination = usePagination({ initialLimit: INITIAL_LIMIT });
  const { toasts, showSuccess, showError, removeToast } = useToast();
  
  const params = useMemo(() => ({
    limit: pagination.limit,
    page: pagination.page,
  }), [pagination.limit, pagination.page]);

  const { tasks, total, error, createTask, deleteTask, refetch } = useTasks({ params });
  const [actionError, setActionError] = useState<Error | null>(null);

  useEffect(() => {
    pagination.setTotal(total);
  }, [total, pagination]);

  const handleDelete = async (id: number) => {
    setActionError(null);
    try {
      await deleteTask(id);
      showSuccess('Tarea eliminada', 'La tarea fue eliminada correctamente');
    } catch (err) {
      setActionError(err instanceof Error ? err : new Error('Error al eliminar tarea'));
      showError('Error', 'No se pudo eliminar la tarea');
    }
  };

  const handleAddTask = async (data: TaskFormData) => {
    setActionError(null);
    try {
      await createTask({
        title: data.name,
        userId: 1,
        completed: false,
      });
      showSuccess('Tarea creada', 'La tarea fue agregada correctamente');
    } catch (err) {
      showError('Error', 'No se pudo crear la tarea');
      throw err;
    }
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
      <Paginator
        page={pagination.page}
        pages={pagination.pages}
        limit={pagination.limit}
        total={pagination.total}
        limitOptions={LIMIT_OPTIONS}
        onPageChange={pagination.setPage}
        onLimitChange={pagination.setLimit}
      />
      <CreateTaskModal
        isOpen={modal.isOpen}
        onClose={modal.close}
        onSuccess={handleAddTask}
      />
      <ToastContainer toasts={toasts} onClose={removeToast} />
    </div>
  );
}
