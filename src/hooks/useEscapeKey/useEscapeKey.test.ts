import { renderHook, fireEvent } from '@testing-library/react';
import { useEscapeKey } from './useEscapeKey';

describe('useEscapeKey', () => {
  it('should call onEscape when Escape key is pressed', () => {
    const onEscape = jest.fn();
    renderHook(() => useEscapeKey({ onEscape }));
    
    fireEvent.keyDown(document, { key: 'Escape' });
    
    expect(onEscape).toHaveBeenCalledTimes(1);
  });

  it('should not call onEscape when other keys are pressed', () => {
    const onEscape = jest.fn();
    renderHook(() => useEscapeKey({ onEscape }));
    
    fireEvent.keyDown(document, { key: 'Enter' });
    fireEvent.keyDown(document, { key: 'Space' });
    fireEvent.keyDown(document, { key: 'a' });
    
    expect(onEscape).not.toHaveBeenCalled();
  });

  it('should not call onEscape when disabled', () => {
    const onEscape = jest.fn();
    renderHook(() => useEscapeKey({ onEscape, enabled: false }));
    
    fireEvent.keyDown(document, { key: 'Escape' });
    
    expect(onEscape).not.toHaveBeenCalled();
  });

  it('should enable by default', () => {
    const onEscape = jest.fn();
    renderHook(() => useEscapeKey({ onEscape }));
    
    fireEvent.keyDown(document, { key: 'Escape' });
    
    expect(onEscape).toHaveBeenCalledTimes(1);
  });

  it('should cleanup event listener on unmount', () => {
    const onEscape = jest.fn();
    const { unmount } = renderHook(() => useEscapeKey({ onEscape }));
    
    unmount();
    
    fireEvent.keyDown(document, { key: 'Escape' });
    
    expect(onEscape).not.toHaveBeenCalled();
  });

  it('should respond to enabled changes', () => {
    const onEscape = jest.fn();
    const { rerender } = renderHook(
      ({ enabled }) => useEscapeKey({ onEscape, enabled }),
      { initialProps: { enabled: true } }
    );
    
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onEscape).toHaveBeenCalledTimes(1);
    
    rerender({ enabled: false });
    
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onEscape).toHaveBeenCalledTimes(1);
  });
});

