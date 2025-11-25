import type { InputHTMLAttributes } from 'react';

export interface InputTextProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  info?: string;
  required?: boolean;
}

