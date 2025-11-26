import { renderHook } from '@testing-library/react';
import { useBodyScrollLock } from './useBodyScrollLock';

describe('useBodyScrollLock', () => {
  beforeEach(() => {
    document.body.style.overflow = '';
  });

  afterEach(() => {
    document.body.style.overflow = '';
  });

  it('should lock body scroll when locked is true', () => {
    renderHook(() => useBodyScrollLock(true));
    expect(document.body.style.overflow).toBe('hidden');
  });

  it('should unlock body scroll when locked is false', () => {
    renderHook(() => useBodyScrollLock(false));
    expect(document.body.style.overflow).toBe('unset');
  });

  it('should unlock body scroll on unmount', () => {
    const { unmount } = renderHook(() => useBodyScrollLock(true));
    expect(document.body.style.overflow).toBe('hidden');
    
    unmount();
    expect(document.body.style.overflow).toBe('unset');
  });

  it('should update scroll lock when locked changes', () => {
    const { rerender } = renderHook(({ locked }) => useBodyScrollLock(locked), {
      initialProps: { locked: false },
    });

    expect(document.body.style.overflow).toBe('unset');

    rerender({ locked: true });
    expect(document.body.style.overflow).toBe('hidden');

    rerender({ locked: false });
    expect(document.body.style.overflow).toBe('unset');
  });
});

