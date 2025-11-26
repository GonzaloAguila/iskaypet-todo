import { renderHook, act } from '@testing-library/react';
import { usePagination } from './usePagination';

describe('usePagination', () => {
  it('should initialize with default values', () => {
    const { result } = renderHook(() => usePagination());
    
    expect(result.current.page).toBe(1);
    expect(result.current.limit).toBe(3);
    expect(result.current.total).toBe(0);
    expect(result.current.pages).toBe(0);
  });

  it('should initialize with custom values', () => {
    const { result } = renderHook(() => 
      usePagination({ initialPage: 2, initialLimit: 10, total: 100 })
    );
    
    expect(result.current.page).toBe(2);
    expect(result.current.limit).toBe(10);
    expect(result.current.total).toBe(100);
    expect(result.current.pages).toBe(10);
  });

  it('should calculate pages correctly', () => {
    const { result } = renderHook(() => 
      usePagination({ initialLimit: 5, total: 23 })
    );
    
    expect(result.current.pages).toBe(5);
  });

  it('should navigate to next page', () => {
    const { result } = renderHook(() => 
      usePagination({ initialLimit: 5, total: 20 })
    );
    
    expect(result.current.page).toBe(1);
    expect(result.current.hasNextPage).toBe(true);
    
    act(() => {
      result.current.nextPage();
    });
    
    expect(result.current.page).toBe(2);
  });

  it('should navigate to previous page', () => {
    const { result } = renderHook(() => 
      usePagination({ initialPage: 3, initialLimit: 5, total: 20 })
    );
    
    expect(result.current.page).toBe(3);
    expect(result.current.hasPrevPage).toBe(true);
    
    act(() => {
      result.current.prevPage();
    });
    
    expect(result.current.page).toBe(2);
  });

  it('should not go past last page', () => {
    const { result } = renderHook(() => 
      usePagination({ initialPage: 4, initialLimit: 5, total: 20 })
    );
    
    expect(result.current.page).toBe(4);
    expect(result.current.hasNextPage).toBe(false);
    
    act(() => {
      result.current.nextPage();
    });
    
    expect(result.current.page).toBe(4);
  });

  it('should not go before first page', () => {
    const { result } = renderHook(() => usePagination({ total: 20 }));
    
    expect(result.current.page).toBe(1);
    expect(result.current.hasPrevPage).toBe(false);
    
    act(() => {
      result.current.prevPage();
    });
    
    expect(result.current.page).toBe(1);
  });

  it('should reset to page 1 when limit changes', () => {
    const { result } = renderHook(() => 
      usePagination({ initialPage: 3, initialLimit: 5, total: 50 })
    );
    
    expect(result.current.page).toBe(3);
    
    act(() => {
      result.current.setLimit(10);
    });
    
    expect(result.current.page).toBe(1);
    expect(result.current.limit).toBe(10);
  });

  it('should go to first page', () => {
    const { result } = renderHook(() => 
      usePagination({ initialPage: 5, initialLimit: 5, total: 50 })
    );
    
    act(() => {
      result.current.firstPage();
    });
    
    expect(result.current.page).toBe(1);
  });

  it('should go to last page', () => {
    const { result } = renderHook(() => 
      usePagination({ initialLimit: 5, total: 50 })
    );
    
    act(() => {
      result.current.lastPage();
    });
    
    expect(result.current.page).toBe(10);
  });

  it('should update total correctly', () => {
    const { result } = renderHook(() => usePagination({ initialLimit: 5 }));
    
    expect(result.current.total).toBe(0);
    expect(result.current.pages).toBe(0);
    
    act(() => {
      result.current.setTotal(25);
    });
    
    expect(result.current.total).toBe(25);
    expect(result.current.pages).toBe(5);
  });
});

