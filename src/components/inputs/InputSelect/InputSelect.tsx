import { forwardRef } from 'react';
import InputWrapper from '../InputWrapper';
import styles from './InputSelect.module.css';
import type { InputSelectProps } from './InputSelect.types';

const InputSelect = forwardRef<HTMLSelectElement, InputSelectProps>(
  ({ label, error, info, required, options, onChange, className, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      onChange?.(e.target.value);
    };

    return (
      <InputWrapper label={label} error={error} info={info} required={required}>
        <select
          ref={ref}
          className={`${styles.select} ${error ? styles.selectError : ''} ${className || ''}`}
          onChange={handleChange}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </InputWrapper>
    );
  }
);

InputSelect.displayName = 'InputSelect';

export default InputSelect;

