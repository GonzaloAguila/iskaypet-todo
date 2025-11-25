import { forwardRef } from 'react';
import InputWrapper from '../InputWrapper';
import styles from './InputTextArea.module.css';
import type { InputTextAreaProps } from './InputTextArea.types';

const InputTextArea = forwardRef<HTMLTextAreaElement, InputTextAreaProps>(
  ({ label, error, info, required, className, ...props }, ref) => {
    return (
      <InputWrapper label={label} error={error} info={info} required={required}>
        <textarea
          ref={ref}
          className={`${styles.textarea} ${error ? styles.textareaError : ''} ${className || ''}`}
          {...props}
        />
      </InputWrapper>
    );
  }
);

InputTextArea.displayName = 'InputTextArea';

export default InputTextArea;

