import { useState, useCallback, useEffect, useMemo } from 'react';
import useCounter from '../../../../../hooks/useCounter.hook';
import useDrag from '../../../../../hooks/useDrag.hook';
import style from '../lightBox.module.scss';

interface Props {
    images: Array<string> | undefined;
    role?: string;
}
interface ImageStyles {
    transition: string;
    transform: string;
}

const Swipe = ({ images, role = 'role-images' }: Props): JSX.Element | null => {
    const [divRef, __setDivRef] = useState<HTMLDivElement | null>(null);
    const setDivRef = useCallback((div: HTMLDivElement) => __setDivRef(div), [__setDivRef]);
    const { positionX, isDragging, startPositionX } = useDrag(divRef);
    const marginTop = 110;
    const { count, increment, decrement, setCount } = useCounter(0);
    const [transform, setTransform] = useState<ImageStyles | undefined>(undefined);

    const bounds = divRef?.getBoundingClientRect();
    let imagesPixelsToHide: Array<number> = [];

    if (bounds) {
        const width = bounds.width;
        const picture = images?.length;
        if (picture) {
            const imageWidth = width / picture;
            const browserCenter = window.innerWidth / 2;
            const firsImagePixelsToHide = browserCenter - imageWidth / 2;
            imagesPixelsToHide = [firsImagePixelsToHide];

            for (let i = 0; i < picture - 1; i++) {
                let pixelsToHide = -imageWidth * (i + 1) + firsImagePixelsToHide;
                imagesPixelsToHide = [...imagesPixelsToHide, pixelsToHide];
            }
        }
    }

    const transition = 'transform 350ms ease-in-out 15ms';
    const transformDefault = TransformPosition(imagesPixelsToHide, count, marginTop);

    /* eslint-disable */
    useEffect(() => {
        if (isDragging) {
            setTransform({
                transform: `translateX(${positionX}px) translateY(${marginTop}px)`,
                transition: ''
            });
        } else {
            setCount(Snap(imagesPixelsToHide, positionX));

            if (positionX < imagesPixelsToHide[count] && count < imagesPixelsToHide.length - 1) {
                increment();
            }
            if (positionX > -startPositionX && count > 0) {
                decrement();
            }
            setTransform(TransformPosition(imagesPixelsToHide, count, marginTop, transition));
        }
    }, [isDragging]);
    /* eslint-disable */
    useMemo(() => {
        setTransform(TransformPosition(imagesPixelsToHide, count, marginTop, transition));
    }, [count]);

    const imageStyle = {
        width: `${window.innerWidth * 0.8}px`,
        margin: `0px ${window.innerWidth * 0.2}px`
    };

    if (!images || images.length === 0) return null;

    const imageCards: JSX.Element[] = images.map((image: string, key: number) => (
        <div draggable={false} key={key}>
            <img role={role} style={imageStyle} draggable={false} className={style.cursor} src={image} alt={'alt-text'} />
        </div>
    ));

    return (
        <>
            <Arrows imagesPixelsToHide={imagesPixelsToHide} increment={increment} decrement={decrement} count={count} />
            <div className={style.swiper} ref={setDivRef} style={transform !== undefined ? transform : transformDefault}>
                {imageCards}
            </div>
        </>
    );
};

function Snap(array: Array<number>, number: number): number {
    var index = 0;
    for (let i = array.length - 1; i >= 0; i--) {
        if (Math.abs(number - array[i]) < Math.abs(number - array[index])) {
            index = i;
        }
    }
    return index;
}

function TransformPosition(imagesPixelsToHide: number[], index: number, marginTop: number, transition = ''): ImageStyles | undefined {
    if (imagesPixelsToHide.length === 0) return undefined;

    return {
        transform: `translateX(${imagesPixelsToHide[index]}px) translateY(${marginTop}px)`,
        transition: transition
    };
}

interface ArrowProps {
    imagesPixelsToHide: number[];
    count: number;
    increment: () => void;
    decrement: () => void;
}

function Arrows({ imagesPixelsToHide, increment, decrement, count }: ArrowProps): JSX.Element {
    const rightClick = () => {
        if (count > 0) {
            decrement();
        }
    };
    const leftClick = () => {
        if (imagesPixelsToHide.length - 1 > count) {
            increment();
        }
    };

    return (
        <div className={style.arrow}>
            <div className={style.right} onClick={rightClick}>
                &#10096;
            </div>
            <div className={style.left} onClick={leftClick}>
                &#10097;
            </div>
        </div>
    );
}

export default Swipe;
