import { RefObject, useCallback, useEffect, useState } from 'react';

interface Options {
    onPointerDown(e: TouchEvent | MouseEvent): void;
    onPointerUp(e: TouchEvent | MouseEvent): void;
    onPointerMove(e: TouchEvent | MouseEvent): void;
}

interface Props {
    pageX: number;
    pageY: number;
    x: number;
    y: number;
    isDragging: boolean;
}

const useDrag = (ref: RefObject<HTMLDivElement>, options: Options): Props => {
    const { onPointerDown = () => {}, onPointerUp = () => {}, onPointerMove = () => {} } = options;

    const [isDragging, setIsDragging] = useState(false);
    const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
    const [translate, setTranslate] = useState({ pageX: 0, pageY: 0 });

    const handlePointerDown = useCallback(
        (e: TouchEvent | MouseEvent) => {
            setIsDragging(true);
            onPointerDown(e);
            let bounds = ref.current?.getBoundingClientRect();

            if (e instanceof TouchEvent) {
                if (bounds !== undefined) {
                    console.log('down mob' + 111111);
                    setStartPosition({
                        x: e.touches[0].clientX - bounds.left,
                        y: e.touches[0].clientY - bounds.top
                    });
                }
            } else {
                if (bounds !== undefined) {
                    console.log('down pc' + 111111);
                    setStartPosition({
                        x: e.clientX - bounds.left,
                        y: e.clientY - bounds.top
                    });
                }
            }
        },
        [onPointerDown, ref]
    );

    const handlePointerUp = useCallback(
        (e: TouchEvent | MouseEvent) => {
            console.log('up' + 2222);
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
                    console.log('move mob' + 3333);
                    setTranslate({
                        pageX: e.touches[0].pageX,
                        pageY: e.touches[0].pageY
                    });
                } else {
                    console.log('move pc' + 4444);

                    setTranslate({
                        pageX: e.pageX,
                        pageY: e.pageY
                    });
                }
            }
        },
        [isDragging, onPointerMove]
    );

    useEffect(() => {
        const element = ref.current;
        if (element) {
            console.log('effect' + 555555555);

            element.addEventListener('pointerdown', handlePointerDown);
            element.addEventListener('touchstart', handlePointerDown);
            if (isDragging) {
                console.log('add event' + 6666666666);

                element.addEventListener('pointerup', handlePointerUp);
                element.addEventListener('touchend', handlePointerUp);
                element.addEventListener('pointermove', handlePointerMove);
                element.addEventListener('touchmove', handlePointerMove);
            }

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

    return { ...startPosition, ...translate, isDragging };
};

export default useDrag;
