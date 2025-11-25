'use client';

import { useRef, useCallback } from 'react';
import styles from './Modal.module.css';
import type { ModalProps } from './Modal.types';
import Button from '../Button';
import { useEscapeKey, useBodyScrollLock } from '@/src/hooks';

export default function Modal({
  isOpen = false,
  title,
  onClose,
  onAction,
  onReject,
  children,
  actionLabel,
  rejectLabel = 'Cancelar',
  width = '500px',
  isValid = true,
  isLoading = false,
}: ModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  const handleClose = useCallback(() => {
    if (!isLoading) {
      onClose();
    }
  }, [isLoading, onClose]);

  useEscapeKey({ 
    enabled: isOpen && !isLoading, 
    onEscape: handleClose 
  });
  
  useBodyScrollLock(isOpen);

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === overlayRef.current && !isLoading) {
      onClose();
    }
  };

  const handleActionClick = () => {
    if (isLoading || !isValid) return;
    onAction?.();
  };

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      className={styles.overlay}
      onClick={handleOverlayClick}
    >
      <div className={styles.modal} style={{ maxWidth: width }}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <button
            type="button"
            className={styles.closeButton}
            onClick={onClose}
            disabled={isLoading}
            aria-label="Cerrar modal"
          >
            ×
          </button>
        </div>
        {children && <div className={styles.content}>{children}</div>}
        <div className={styles.actions}>
          <Button 
            label={rejectLabel} 
            onClick={onReject} 
            variant="SECONDARY" 
            fullWidth={true}
            disabled={isLoading}
          />
          <Button 
            label={actionLabel} 
            onClick={handleActionClick} 
            variant="PRIMARY" 
            fullWidth={true}
            disabled={!isValid || isLoading}
          />
        </div>
      </div>
    </div>
  );
}
