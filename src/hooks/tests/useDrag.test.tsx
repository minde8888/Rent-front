import { renderHook } from '@testing-library/react';
import { useRef } from 'react';
import useDrag from '../useDrag.hook';

const setup = () => {
    const Component = () => {
        const divRef = useRef<HTMLDivElement | null>(null);
        useDrag(divRef as unknown as HTMLDivElement)
        return <div ref={divRef}></div>
    }
}

describe('useDrag', () => {
    xtest('should use Drag ', () => {

        // const setDivRef = useCallback((div: HTMLDivElement) => __setDivRef(div), [__setDivRef]);
        // const HTML = () => {
        //     return (<div ref={divRef}></div>)
        // }
        // const { result } = renderHook(() => useDrag(divRef as unknown as HTMLDivElement));
        // expect(HTML).toBe(result.current);
    });
});
