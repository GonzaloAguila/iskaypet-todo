import type { TextareaHTMLAttributes } from 'react';

export interface InputTextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  info?: string;
  required?: boolean;
}

