import type { ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonVariant = 'PRIMARY' | 'SECONDARY' | 'OUTLINED';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  variant?: ButtonVariant;
  fullWidth?: boolean;
  children?: ReactNode;
}

