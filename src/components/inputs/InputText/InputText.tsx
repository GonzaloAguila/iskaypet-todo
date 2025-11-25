import { forwardRef } from 'react';
import InputWrapper from '../InputWrapper';
import styles from './InputText.module.css';
import type { InputTextProps } from './InputText.types';

const InputText = forwardRef<HTMLInputElement, InputTextProps>(
  ({ label, error, info, required, className, ...props }, ref) => {
    return (
      <InputWrapper label={label} error={error} info={info} required={required}>
        <input
          ref={ref}
          type="text"
          className={`${styles.input} ${error ? styles.inputError : ''} ${className || ''}`}
          {...props}
        />
      </InputWrapper>
    );
  }
);

InputText.displayName = 'InputText';

export default InputText;
