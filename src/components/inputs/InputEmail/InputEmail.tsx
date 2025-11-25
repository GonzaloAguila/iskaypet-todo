import { forwardRef } from 'react';
import InputWrapper from '../InputWrapper';
import styles from './InputEmail.module.css';
import type { InputEmailProps } from './InputEmail.types';

const InputEmail = forwardRef<HTMLInputElement, InputEmailProps>(
  ({ label, error, info, required, className, ...props }, ref) => {
    return (
      <InputWrapper label={label} error={error} info={info} required={required}>
        <input
          ref={ref}
          type="email"
          className={`${styles.input} ${error ? styles.inputError : ''} ${className || ''}`}
          {...props}
        />
      </InputWrapper>
    );
  }
);

InputEmail.displayName = 'InputEmail';

export default InputEmail;
