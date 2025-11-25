'use client';

import { useEffect } from 'react';

interface UseEscapeKeyOptions {
  enabled?: boolean;
  onEscape: () => void;
}

export function useEscapeKey({ enabled = true, onEscape }: UseEscapeKeyOptions): void {
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onEscape();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [enabled, onEscape]);
}

