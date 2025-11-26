import { renderHook, act } from '@testing-library/react';
import { useToast } from './useToast';

describe('useToast', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should initialize with empty toasts array', () => {
    const { result } = renderHook(() => useToast());
    expect(result.current.toasts).toEqual([]);
  });

  it('should add a toast with showToast', () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      result.current.showToast('Test Title', 'Test message', 'info');
    });

    expect(result.current.toasts).toHaveLength(1);
    expect(result.current.toasts[0].title).toBe('Test Title');
    expect(result.current.toasts[0].message).toBe('Test message');
    expect(result.current.toasts[0].type).toBe('info');
  });

  it('should add a toast with only title', () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      result.current.showSuccess('Success Title');
    });

    expect(result.current.toasts).toHaveLength(1);
    expect(result.current.toasts[0].title).toBe('Success Title');
    expect(result.current.toasts[0].message).toBeUndefined();
  });

  it('should add a success toast', () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      result.current.showSuccess('Success', 'Success message');
    });

    expect(result.current.toasts).toHaveLength(1);
    expect(result.current.toasts[0].type).toBe('success');
  });

  it('should add an error toast', () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      result.current.showError('Error', 'Error message');
    });

    expect(result.current.toasts).toHaveLength(1);
    expect(result.current.toasts[0].type).toBe('error');
  });

  it('should add a warning toast', () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      result.current.showWarning('Warning', 'Warning message');
    });

    expect(result.current.toasts).toHaveLength(1);
    expect(result.current.toasts[0].type).toBe('warning');
  });

  it('should add an info toast', () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      result.current.showInfo('Info', 'Info message');
    });

    expect(result.current.toasts).toHaveLength(1);
    expect(result.current.toasts[0].type).toBe('info');
  });

  it('should remove toast after duration', () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      result.current.showToast('Test', 'Message', 'info', 1000);
    });

    expect(result.current.toasts).toHaveLength(1);

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(result.current.toasts).toHaveLength(0);
  });

  it('should remove toast manually', () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      result.current.showToast('Test', 'Message', 'info', 0);
    });

    const toastId = result.current.toasts[0].id;

    act(() => {
      result.current.removeToast(toastId);
    });

    expect(result.current.toasts).toHaveLength(0);
  });

  it('should clear all toasts', () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      result.current.showSuccess('Success', 'Message');
      result.current.showError('Error', 'Message');
      result.current.showInfo('Info', 'Message');
    });

    expect(result.current.toasts).toHaveLength(3);

    act(() => {
      result.current.clearAll();
    });

    expect(result.current.toasts).toHaveLength(0);
  });

  it('should support multiple toasts', () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      result.current.showSuccess('First', 'First message');
      result.current.showError('Second', 'Second message');
    });

    expect(result.current.toasts).toHaveLength(2);
    expect(result.current.toasts[0].title).toBe('First');
    expect(result.current.toasts[1].title).toBe('Second');
  });

  it('should generate unique ids for each toast', () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      result.current.showToast('First', undefined, 'info', 0);
      result.current.showToast('Second', undefined, 'info', 0);
    });

    const ids = result.current.toasts.map((t) => t.id);
    expect(new Set(ids).size).toBe(2);
  });
});
