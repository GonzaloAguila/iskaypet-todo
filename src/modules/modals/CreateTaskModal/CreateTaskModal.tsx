'use client';

import { useState, useRef, useCallback } from 'react';
import Modal from '@/src/components/Modal';
import TaskForm, { type TaskFormHandle, type TaskFormData } from '../../forms/TaskForm';
import ErrorMessage from '@/src/components/ErrorMessage';

interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (data: TaskFormData) => Promise<void> | void;
}

export default function CreateTaskModal({
  isOpen,
  onClose,
  onSuccess,
}: CreateTaskModalProps) {
  const formRef = useRef<TaskFormHandle>(null);
  const [isFormValid, setIsFormValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const handleFormSubmit = async (data: TaskFormData) => {
    setError(null);
    setIsLoading(true);
    try {
      await onSuccess(data);
      formRef.current?.reset();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Error al crear tarea'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleAction = useCallback(() => {
    formRef.current?.submit();
  }, []);

  const handleReject = useCallback(() => {
    if (!isLoading) {
      setError(null);
      formRef.current?.reset();
      onClose();
    }
  }, [isLoading, onClose]);

  return (
    <Modal
      title="Agregar tarea"
      isOpen={isOpen}
      onClose={handleReject}
      onAction={handleAction}
      onReject={handleReject}
      actionLabel={isLoading ? 'Agregando...' : 'Agregar'}
      rejectLabel="Cancelar"
      isValid={isFormValid && !isLoading}
      isLoading={isLoading}
    >
      {error && <ErrorMessage error={error} variant="inline" />}
      <TaskForm 
        ref={formRef}
        onSubmit={handleFormSubmit}
        onValidationChange={setIsFormValid}
      />
    </Modal>
  );
}
