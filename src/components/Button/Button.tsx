import { forwardRef } from 'react';
import styles from './Button.module.css';
import type { ButtonProps } from './Button.types';

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    label, 
    variant = 'PRIMARY', 
    fullWidth = true,
    disabled = false,
    className,
    children,
    ...props 
  }, ref) => {
    const variantClass = styles[variant.toLowerCase() as keyof typeof styles] || styles.primary;
    const fullWidthClass = fullWidth ? styles.fullWidth : '';
    
    return (
      <button
        ref={ref}
        className={`${styles.button} ${variantClass} ${fullWidthClass} ${className || ''}`}
        disabled={disabled}
        {...props}
      >
        {label || children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;

