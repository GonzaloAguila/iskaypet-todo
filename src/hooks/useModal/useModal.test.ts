import { renderHook, act } from '@testing-library/react';
import { useModal } from './useModal';

describe('useModal', () => {
  it('should initialize with isOpen as false by default', () => {
    const { result } = renderHook(() => useModal());
    expect(result.current.isOpen).toBe(false);
  });

  it('should initialize with custom initial state', () => {
    const { result } = renderHook(() => useModal(true));
    expect(result.current.isOpen).toBe(true);
  });

  it('should open modal when open is called', () => {
    const { result } = renderHook(() => useModal());
    
    act(() => {
      result.current.open();
    });
    
    expect(result.current.isOpen).toBe(true);
  });

  it('should close modal when close is called', () => {
    const { result } = renderHook(() => useModal(true));
    
    act(() => {
      result.current.close();
    });
    
    expect(result.current.isOpen).toBe(false);
  });

  it('should toggle modal state', () => {
    const { result } = renderHook(() => useModal());
    
    act(() => {
      result.current.toggle();
    });
    expect(result.current.isOpen).toBe(true);
    
    act(() => {
      result.current.toggle();
    });
    expect(result.current.isOpen).toBe(false);
  });

  it('should return stable function references', () => {
    const { result, rerender } = renderHook(() => useModal());
    
    const { open: open1, close: close1, toggle: toggle1 } = result.current;
    
    rerender();
    
    const { open: open2, close: close2, toggle: toggle2 } = result.current;
    
    expect(open1).toBe(open2);
    expect(close1).toBe(close2);
    expect(toggle1).toBe(toggle2);
  });
});

