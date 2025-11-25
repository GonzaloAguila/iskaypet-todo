import { forwardRef } from 'react';
import InputWrapper from '../InputWrapper';
import styles from './InputPhone.module.css';
import type { InputPhoneProps } from './InputPhone.types';

const InputPhone = forwardRef<HTMLInputElement, InputPhoneProps>(
  ({ label, error, info, required, className, ...props }, ref) => {
    return (
      <InputWrapper label={label} error={error} info={info} required={required}>
        <input
          ref={ref}
          type="tel"
          className={`${styles.input} ${error ? styles.inputError : ''} ${className || ''}`}
          {...props}
        />
      </InputWrapper>
    );
  }
);

InputPhone.displayName = 'InputPhone';

export default InputPhone;
