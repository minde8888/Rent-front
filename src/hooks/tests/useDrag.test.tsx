import userEvent from '@testing-library/user-event';
import { useRef } from 'react';
import useDrag from '../useDrag.hook';

export default async function drag() {
    const divRef = useRef<HTMLDivElement | null>(null);
    useDrag(divRef as unknown as HTMLDivElement);
    return <div ref={divRef}></div>;
}

describe('useDrag', () => {
    xtest('should use Drag ', () => {
        const element = drag();
        console.log(element);
    });
});
