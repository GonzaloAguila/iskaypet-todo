import type { InputHTMLAttributes } from 'react';

export interface InputEmailProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  info?: string;
  required?: boolean;
}

