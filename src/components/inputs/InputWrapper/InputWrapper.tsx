import { type ReactNode } from 'react';
import styles from './InputWrapper.module.css';

export interface InputWrapperProps {
  label?: string;
  error?: string;
  info?: string;
  required?: boolean;
  children: ReactNode;
}

export default function InputWrapper({
  label,
  error,
  info,
  required,
  children,
}: InputWrapperProps) {
  return (
    <div className={styles.inputWrapper}>
      {label && (
        <label className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}
      {children}
      {error && <span className={styles.errorMessage}>{error}</span>}
      {info && !error && <span className={styles.infoMessage}>{info}</span>}
    </div>
  );
}

