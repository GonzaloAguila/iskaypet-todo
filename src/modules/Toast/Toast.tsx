'use client';

import styles from './Toast.module.css';
import type { ToastItemProps, ToastContainerProps } from './Toast.types';

function ToastItem({ toast, onClose }: ToastItemProps) {
  return (
    <div 
      className={`${styles.toast} ${styles[toast.type]}`}
      role="alert"
      aria-live="polite"
    >
      <div className={styles.content}>
        <span className={styles.title}>{toast.title}</span>
        {toast.message && <span className={styles.message}>{toast.message}</span>}
      </div>
      <button
        type="button"
        className={styles.closeButton}
        onClick={() => onClose(toast.id)}
        aria-label="Cerrar notificacion"
      >
        &times;
      </button>
    </div>
  );
}

export default function ToastContainer({ toasts, onClose }: ToastContainerProps) {
  if (toasts.length === 0) {
    return null;
  }

  return (
    <div className={styles.container} aria-label="Notificaciones">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onClose={onClose} />
      ))}
    </div>
  );
}
