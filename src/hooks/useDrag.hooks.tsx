import { RefObject, useCallback, useEffect, useState } from 'react';

interface Options {
    onPointerDown(e: TouchEvent | MouseEvent): void;
    onPointerUp(e: TouchEvent | MouseEvent): void;
    onPointerMove(e: TouchEvent | MouseEvent): void;
}

interface Props {
    positionX: number;
    positionY: number;
    isDragging: boolean;
}

const useDrag = (ref: RefObject<HTMLDivElement>, options: Options): Props => {
    const { onPointerDown = () => {}, onPointerUp = () => {}, onPointerMove = () => {} } = options;

    const [isDragging, setIsDragging] = useState(false);
    const [startPosition, setStartPosition] = useState({ startX: 0, startY: 0 });
    const [translate, setTranslate] = useState({ pageX: 0, pageY: 0 });

    const handlePointerDown = useCallback(
        (e: TouchEvent | MouseEvent) => {
            setIsDragging(true);
            onPointerDown(e);
            let bounds = ref.current?.getBoundingClientRect();

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
        [onPointerDown, ref]
    );

    const handlePointerUp = useCallback(
        (e: TouchEvent | MouseEvent) => {
            setIsDragging(false);
            onPointerUp(e);
        },
        [onPointerUp]
    );

    const handlePointerMove = useCallback(
        (e: TouchEvent | MouseEvent) => {
            onPointerMove(e);
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
        [onPointerMove]
    );

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
    }, [isDragging]);

    const position = {
        positionX: translate.pageX - startPosition.startX,
        positionY: translate.pageY - startPosition.startY
    };

    return { ...position, isDragging };
};

export default useDrag;
