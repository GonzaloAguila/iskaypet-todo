import type { Toast } from '@/src/hooks/useToast/useToast';

export interface ToastItemProps {
  toast: Toast;
  onClose: (id: string) => void;
}

export interface ToastContainerProps {
  toasts: Toast[];
  onClose: (id: string) => void;
}

