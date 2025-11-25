import styles from './ErrorMessage.module.css';
import Button from '../Button';
import { type AppError, isAppError, getUserMessage } from '../../utils/errors';

interface ErrorMessageProps {
  error: Error | AppError | null;
  title?: string;
  onRetry?: () => void;
  variant?: 'default' | 'inline';
}

export default function ErrorMessage({
  error,
  title = 'Ha ocurrido un error',
  onRetry,
  variant = 'default',
}: ErrorMessageProps) {
  if (!error) return null;

  const message = isAppError(error)
    ? getUserMessage(error)
    : error.message || 'Error desconocido';

  const isInline = variant === 'inline';
  const containerClass = isInline
    ? `${styles.container} ${styles.containerInline}`
    : styles.container;
  const iconClass = isInline
    ? `${styles.icon} ${styles.iconInline}`
    : styles.icon;

  return (
    <div className={containerClass} role="alert">
      <span className={iconClass}>!</span>
      <div className={styles.content}>
        {!isInline && <h3 className={styles.title}>{title}</h3>}
        <p className={styles.message}>{message}</p>
      </div>
      {onRetry && !isInline && (
        <div className={styles.retryButton}>
          <Button
            label="Reintentar"
            variant="PRIMARY"
            fullWidth={false}
            onClick={onRetry}
          />
        </div>
      )}
    </div>
  );
}
