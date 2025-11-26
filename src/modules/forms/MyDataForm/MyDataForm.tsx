'use client';

import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import InputText from '../../../components/inputs/InputText';
import InputEmail from '../../../components/inputs/InputEmail';
import InputPhone from '../../../components/inputs/InputPhone';
import Button from '../../../components/Button';
import Card from '../../../components/Card';
import ToastContainer from '@/src/modules/Toast';
import { useToast } from '@/src/hooks';
import { myDataFormSchema, type MyDataFormData } from './constants';
import styles from './MyDataForm.module.css';

export default function MyDataForm() {
  const { toasts, showInfo, removeToast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<MyDataFormData>({
    resolver: joiResolver(myDataFormSchema),
    mode: 'onChange',
    shouldFocusError: true,
  });

  const onSubmit = () => {
    showInfo('En desarrollo', 'Esta funcionalidad aun no esta implementada');
  };

  return (
    <div className={styles.formContainer}>
      <Card>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <InputText
          label="Nombre"
          {...register('name')}
          error={errors.name?.message}
          maxLength={50}
          required
        />
        <InputEmail
          label="Email"
          {...register('email')}
          error={errors.email?.message}
          maxLength={50}
          required
        />
        <InputPhone
          label="Teléfono"
          {...register('phone')}
          error={errors.phone?.message}
          maxLength={50}
          required
        />
        <Button 
          type="submit" 
          variant="PRIMARY" 
          label="Guardar" 
          disabled={!isValid}
        />
      </form>
    </Card>
    <ToastContainer toasts={toasts} onClose={removeToast} />
    </div>
  );
}

