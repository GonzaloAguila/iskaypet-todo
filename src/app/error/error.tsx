'use client';

import { useEffect } from 'react';
import styles from './error.module.css';
import Button from '../../components/Button';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className={styles.container}>
      <div className={styles.icon}>!</div>
      <h1 className={styles.title}>Ha ocurrido un error</h1>
      <p className={styles.message}>
        Lo sentimos, algo salio mal. Por favor intenta nuevamente.
      </p>
      <div className={styles.actions}>
        <Button
          label="Reintentar"
          variant="PRIMARY"
          fullWidth={false}
          onClick={reset}
        />
        <Button
          label="Volver al inicio"
          variant="SECONDARY"
          fullWidth={false}
          onClick={() => window.location.href = '/mis-datos'}
        />
      </div>
      {process.env.NODE_ENV === 'development' && error.message && (
        <div className={styles.details}>
          <h3 className={styles.detailsTitle}>Detalles del error</h3>
          <p className={styles.detailsMessage}>{error.message}</p>
        </div>
      )}
    </div>
  );
}

