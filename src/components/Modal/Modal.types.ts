import type { ReactNode } from 'react';

export interface ModalProps {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  onAction?: () => void;
  onReject: () => void;
  children?: ReactNode;
  actionLabel: string;
  rejectLabel?: string;
  width?: string;
  isValid?: boolean;
  isLoading?: boolean;
}

