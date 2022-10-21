import { renderHook } from '@testing-library/react';
import useModal from '../useModal.hook';

describe('useModal', () => {
    test('should use modal ', () => {
        const { result } = renderHook(() => useModal());
        expect(result.current.isOpen).toBe(false);
        expect(typeof result.current.toggle).toBe('function');
    });
});

