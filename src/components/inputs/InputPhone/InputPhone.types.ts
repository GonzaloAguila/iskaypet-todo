import type { InputHTMLAttributes } from 'react';

export interface InputPhoneProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  info?: string;
  required?: boolean;
}

