import { renderHook } from '@testing-library/react';
import useCounter from '../useCounter.hook';

describe('useCounter', () => {
    test('should use counter ', () => {
        const { result } = renderHook(() => useCounter(1));
        expect(result.current.count).toBe(1);
        expect(typeof result.current.decrement).toBe('function');
        expect(typeof result.current.increment).toBe('function');
        expect(typeof result.current.reset).toBe('function');
        expect(typeof result.current.setCount).toBe('function');
    });
});
