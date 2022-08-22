import { RefObject, useEffect, useState } from 'react';

interface Options {
    onPointerDown(e: TouchEvent | MouseEvent): void;
    onPointerUp(e: TouchEvent | MouseEvent): void;
    onPointerMove(e: TouchEvent | MouseEvent): void;
    onDrag(e: TouchEvent | MouseEvent): void;
}

const useDrag = (ref: RefObject<HTMLDivElement>, options: Options): { clientX: number, clientY: number } => {
    const { onPointerDown = () => { }, onPointerUp = () => { }, onPointerMove = () => { }, onDrag = () => { } } = options;

    const [isDragging, setIsDragging] = useState(false);
    const [startPosition, setStartPosition] = useState({ clientX: 0, clientY: 0 });

    const handlePointerDown = (e: TouchEvent | MouseEvent) => {
        setIsDragging(true);
        onPointerDown(e);
        if (e instanceof TouchEvent) {
            setStartPosition({
                clientX: e.touches[0].clientX,
                clientY: e.touches[0].clientY,
            })
        } else {
            setStartPosition({
                clientX: e.clientX,
                clientY: e.clientY,
            })
        }
    };


    const handlePointerUp = (e: TouchEvent | MouseEvent) => {
        setIsDragging(false);
        onPointerUp(e);
    };

    const handlePointerMove = (e: TouchEvent | MouseEvent) => {
        onPointerMove(e);
        if (isDragging) {
            onDrag(e);
        }
    };

    useEffect(() => {
        const element = ref.current;

        if (element) {
            element.addEventListener('pointerdown', handlePointerDown);
            element.addEventListener('touchstart', handlePointerDown);
            element.addEventListener('pointerup', handlePointerUp);
            element.addEventListener('touchend', handlePointerUp);
            element.addEventListener('pointermove', handlePointerMove);
            element.addEventListener('touchmove', handlePointerMove);

            return () => {
                element.removeEventListener('pointerdown', handlePointerDown);
                element.removeEventListener('touchstart', handlePointerDown);
                element.removeEventListener('pointerup', handlePointerUp);
                element.removeEventListener('touchend', handlePointerUp);
                element.removeEventListener('pointermove', handlePointerMove);
                element.removeEventListener('touchmove', handlePointerMove);
            };
        }

        return () => { };
    }, [isDragging]);

    return { ...startPosition };
};

export default useDrag;