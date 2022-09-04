import { useState, useCallback } from 'react';
import useDrag from '../../../../../hooks/useDrag.hooks';
import { Direction } from '../lightBox.component';
import style from '../lightBox.module.scss';

interface Props {
    images: Array<string> | undefined;
    changeImage: Direction
}

const Swipe = ({ images, changeImage }: Props) => {
    const [divRef, __setDivRef] = useState<HTMLDivElement | null>(null);
    const setDivRef = useCallback((div: HTMLDivElement) => __setDivRef(div), [__setDivRef]);

    const { positionX, isDragging, startPositionX } = useDrag(divRef);
    const marginTop = 110;

    if (!images || images.length === 0) return null;

    const bounds = divRef?.getBoundingClientRect();
    let imagesPixelsToHide: Array<number> = [];
    let firsImageToCenter: number = 0;

    if (bounds) {
        const width = bounds.width;
        const picture = images.length;
        const imageWidth = width / (picture);
        const browserCenter = window.innerWidth / 2;
        const firsImagePixelsToHide = browserCenter - imageWidth / 2;
        firsImageToCenter = firsImagePixelsToHide;

        imagesPixelsToHide = [firsImagePixelsToHide];

        for (let i = 0; i < picture - 1; i++) {
            let pixelsToHide = -imageWidth * (i + 1) + firsImagePixelsToHide;
            imagesPixelsToHide = [...imagesPixelsToHide, pixelsToHide];
        }
    }

    let transform = {
        transform: `translateX(${positionX === 0 ? firsImageToCenter : positionX}px) translateY(${marginTop}px)`
    };

    if (!isDragging && imagesPixelsToHide.length > 0 && positionX !== 0) {
        let index = Closest(imagesPixelsToHide, positionX)

        if (positionX < imagesPixelsToHide[index] && index < imagesPixelsToHide.length - 1) {
            index = index + 1
        }
        if (positionX > -startPositionX && index > 0) {
            index = index - 1
        }

        transform = {
            transform: `translateX(${imagesPixelsToHide[index]}px) translateY(${marginTop}px)`,
            ...{ transition: 'transform 350ms ease-in-out 15ms' }
        };
    }

    const imageStyle = {
        width: `${window.innerWidth * 0.8}px`,
        margin: `0px ${window.innerWidth * 0.2}px`
    }

    const imageCards: JSX.Element[] = images.map((image: string, key: number) => (
        <div draggable={false} key={key}>
            <img role="role-images" style={imageStyle} draggable={false} className={style.cursor} src={image} />
        </div>
    ));

    return (
        <div className={style.swiper} ref={setDivRef} style={transform}>
            {imageCards}
        </div>
    );
};

function Closest(array: Array<number>, number: number): number {
    var index = 0;
    for (let i = array.length - 1; i >= 0; i--) {
        if (Math.abs(number - array[i]) < Math.abs(number - array[index])) {
            index = i;
        }
    }
    return index;
}

export default Swipe;
