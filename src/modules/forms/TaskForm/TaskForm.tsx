'use client';

import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { useEffect, useImperativeHandle, forwardRef, useCallback } from 'react';
import InputText from '../../../components/inputs/InputText';
import InputTextArea from '../../../components/inputs/InputTextArea';
import { taskFormSchema, type TaskFormData } from './constants';
import styles from './TaskForm.module.css';

interface TaskFormProps {
  onSubmit: (data: TaskFormData) => void; 
  onValidationChange?: (isValid: boolean) => void;
}

export interface TaskFormHandle {
  submit: () => void;
  reset: () => void;
}

const TaskForm = forwardRef<TaskFormHandle, TaskFormProps>(
  ({ onSubmit, onValidationChange }, ref) => {
    const {
      register,
      handleSubmit,
      formState: { errors, isValid },
      reset,
    } = useForm<TaskFormData>({
      resolver: joiResolver(taskFormSchema),
      mode: 'onChange',
      shouldFocusError: true,
    });

    useEffect(() => {
      onValidationChange?.(isValid);
    }, [isValid, onValidationChange]);

    const handleFormSubmit = useCallback((data: TaskFormData) => {
      onSubmit(data);
    }, [onSubmit]);

    useImperativeHandle(ref, () => ({
      submit: () => handleSubmit(handleFormSubmit)(),
      reset: () => reset(),
    }), [handleSubmit, handleFormSubmit, reset]);

    return (
      <form onSubmit={handleSubmit(handleFormSubmit)} className={styles.form}>
        <InputText
          label="Título"
          placeholder="Ingresa el título de la tarea"
          minLength={3}
          maxLength={100}
          {...register('name')}
          error={errors.name?.message}
          required
        />
        <InputTextArea
          label="Descripción"
          placeholder="Ingresa la descripción de la tarea"
          minLength={5}
          maxLength={500}
          {...register('description')}
          error={errors.description?.message}
          required
        />
      </form>
    );
  }
);

TaskForm.displayName = 'TaskForm';

export default TaskForm;
