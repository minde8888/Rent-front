import { renderHook } from '@testing-library/react';
import useCounter from '../useCounter.hooks';
import useModal from '../useModal';

describe('useHooks', () => {
    test('should use counter ', () => {
        const { result } = renderHook(() => useCounter(1));
        expect(result.current.count).toBe(1);
        expect(typeof result.current.decrement).toBe('function');
        expect(typeof result.current.increment).toBe('function');
        expect(typeof result.current.reset).toBe('function');
        expect(typeof result.current.setCount).toBe('function');
    });
    test('should use modal ', () => {
        const { result } = renderHook(() => useModal());
        expect(result.current.isOpen).toBe(false);
        expect(typeof result.current.toggle).toBe('function');
    });
});
