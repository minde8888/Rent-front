import { renderHook } from '@testing-library/react';
import { useCallback, useRef, useState } from 'react';
import useDrag from '../useDrag.hook';


describe('useDrag', () => {
    xtest('should use Drag ', () => {
        const divRef = useRef<HTMLDivElement | null>(null);
        // const setDivRef = useCallback((div: HTMLDivElement) => __setDivRef(div), [__setDivRef]);
        const HTML = () => {
            return (<div ref={divRef}></div>)
        }
        const { result } = renderHook(() => useDrag(divRef as unknown as HTMLDivElement));
        expect(HTML).toBe(result.current);
    });
});
