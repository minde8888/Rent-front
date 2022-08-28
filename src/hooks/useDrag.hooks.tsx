import { useCallback, useEffect, useState } from 'react';

interface Props {
    positionX: number;
    positionY: number;
    isDragging: boolean;
}

const useDrag = (ref: HTMLDivElement | null): Props => {

    const [isDragging, setIsDragging] = useState(false);
    const [startPosition, setStartPosition] = useState({ startX: 0, startY: 0 });
    const [translate, setTranslate] = useState({ pageX: 0, pageY: 0 });

    const handlePointerDown = useCallback(
        (e: TouchEvent | MouseEvent) => {
            setIsDragging(true);
            const bounds = ref?.getBoundingClientRect();

            if (e instanceof TouchEvent) {
                if (bounds !== undefined) {
                    setStartPosition({
                        startX: e.touches[0].clientX - bounds.left,
                        startY: e.touches[0].clientY - bounds.top
                    });
                    setTranslate({
                        pageX: e.touches[0].pageX,
                        pageY: e.touches[0].pageY
                    });
                }
            } else {
                if (bounds !== undefined) {
                    setStartPosition({
                        startX: e.clientX - bounds.left,
                        startY: e.clientY - bounds.top
                    });
                    setTranslate({
                        pageX: e.pageX,
                        pageY: e.pageY
                    });
                }
            }
        },
        [ref]
    );

    const handlePointerUp = useCallback(
        (e: TouchEvent | MouseEvent) => {
            setIsDragging(false);
        },
        []
    );

    const handlePointerMove = useCallback(
        (e: TouchEvent | MouseEvent) => {
            if (isDragging) {
                if (e instanceof TouchEvent) {
                    setTranslate({
                        pageX: e.touches[0].pageX,
                        pageY: e.touches[0].pageY
                    });
                } else {
                    setTranslate({
                        pageX: e.pageX,
                        pageY: e.pageY
                    });
                }
            }
        },
        [isDragging]
    );

    useEffect(() => {
        if (!ref) return () => { }

        ref.addEventListener('pointerdown', handlePointerDown);
        ref.addEventListener('touchstart', handlePointerDown);
        ref.addEventListener('pointerup', handlePointerUp);
        ref.addEventListener('touchend', handlePointerUp);
        ref.addEventListener('pointermove', handlePointerMove);
        ref.addEventListener('touchmove', handlePointerMove);

        return () => {
            ref.removeEventListener('pointerdown', handlePointerDown);
            ref.removeEventListener('touchstart', handlePointerDown);
            ref.removeEventListener('pointerup', handlePointerUp);
            ref.removeEventListener('touchend', handlePointerUp);
            ref.removeEventListener('pointermove', handlePointerMove);
            ref.removeEventListener('touchmove', handlePointerMove);
        };

    }, [ref, isDragging]);

    const position = {
        positionX: translate.pageX - startPosition.startX,
        positionY: translate.pageY - startPosition.startY
    };

    return { ...position, isDragging };
};

export default useDrag;
