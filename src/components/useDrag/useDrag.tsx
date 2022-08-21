import { RefObject, useEffect, useState } from 'react';

const useDrag = (ref: RefObject<HTMLDivElement>, deps: { x: number }, options: any) => {

    const {
        onPointerDown = () => { },
        onPointerUp = () => { },
        onPointerMove = () => { },
        onDrag = () => { }
    } = options;

    const [isDragging, setIsDragging] = useState(false);

    const handlePointerDown = (e: TouchEvent | MouseEvent) => {
        setIsDragging(true);
        onPointerDown(e);
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
            element.addEventListener("pointerdown", handlePointerDown);
            element.addEventListener('touchstart', handlePointerDown);
            element.addEventListener("pointerup", handlePointerUp);
            element.addEventListener("touchend", handlePointerUp);
            element.addEventListener("pointermove", handlePointerMove);
            element.addEventListener("touchmove", handlePointerMove);

            return () => {
                element.removeEventListener("pointerdown", handlePointerDown);
                element.removeEventListener('touchstart', handlePointerDown);
                element.removeEventListener("pointerup", handlePointerUp);
                element.removeEventListener("touchend", handlePointerUp);
                element.removeEventListener("pointermove", handlePointerMove);
                element.removeEventListener("touchmove", handlePointerMove);
            };
        }

        return () => { };
    }, [deps, isDragging]);

    return { isDragging };
};

export default useDrag;