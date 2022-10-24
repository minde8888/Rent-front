import { useCallback, useEffect, useState } from 'react';

interface Props {
    positionX: number;
    positionY: number;
    isDragging?: boolean;
    startPositionX: number;
    startPositionY: number;
}

const useDrag = (ref: HTMLDivElement | null): Props => {
    const [isDragging, setIsDragging] = useState<boolean | undefined>(undefined);
    const [startPosition, setStartPosition] = useState({ startX: 0, startY: 0, startPositionX: 0, startPositionY: 0 });
    const [translate, setTranslate] = useState({ pageX: 0, pageY: 0 });

    const handlePointerDown = useCallback(
        (e: TouchEvent | MouseEvent) => {
            setIsDragging(true);
            const bounds = ref?.getBoundingClientRect();

            if ('TouchEvent' in window && e instanceof TouchEvent) {
                if (bounds !== undefined) {
                    setStartPosition({
                        startX: e.touches[0].clientX - bounds.left,
                        startY: e.touches[0].clientY - bounds.top,
                        startPositionX: e.touches[0].pageX - e.touches[0].clientX - bounds.left,
                        startPositionY: e.touches[0].pageY - e.touches[0].clientY - bounds.top
                    });
                    setTranslate({
                        pageX: e.touches[0].pageX,
                        pageY: e.touches[0].pageY
                    });
                }
            } else {
                if (bounds !== undefined && e instanceof MouseEvent) {
                    setStartPosition({
                        startX: e.clientX - bounds.left,
                        startY: e.clientY - bounds.top,
                        startPositionX: e.pageX - e.clientX - bounds.left,
                        startPositionY: e.pageY - e.clientY - bounds.top
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

    const handlePointerUp = useCallback((e: TouchEvent | MouseEvent) => {
        setIsDragging(false);
    }, []);

    const handlePointerMove = useCallback(
        (e: TouchEvent | MouseEvent) => {
            if (isDragging) {
                if ('TouchEvent' in window && e instanceof TouchEvent) {
                    setTranslate({
                        pageX: e.touches[0].pageX,
                        pageY: e.touches[0].pageY
                    });
                } else if (e instanceof MouseEvent) {
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
        if (!ref) return () => {};

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
        positionY: translate.pageY - startPosition.startY,
        startPositionX: startPosition.startPositionX,
        startPositionY: startPosition.startPositionY
    };

    return {
        ...position,
        isDragging
    };
};

export default useDrag;
