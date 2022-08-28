import { useState, useCallback } from 'react';
import useDrag from '../../../../../hooks/useDrag.hooks';
import style from '../lightBox.module.scss';

interface Props {
    images: Array<string> | undefined;
}

const Swipe = (props: Props) => {

    const [divRef, __setDivRef] = useState<HTMLDivElement | null>(null);
    const setDivRef = useCallback((div: HTMLDivElement) => __setDivRef(div), [__setDivRef]);

    const { positionX, isDragging } = useDrag(divRef);

    if (!props.images || props.images.length === 0) return null;

    const bounds = divRef?.getBoundingClientRect();
    let imagesPixelsToHide: Array<number> = [];
    if (bounds) {
        const width = bounds.width
        const images = props.images.length + 1;
        const imageWidth = (width / (images + 1));
        const browserCenter = window.innerWidth / 2
        const firsImagePixelsToHide = ((imageWidth / 2) + imageWidth - (browserCenter)) * (-1);
        imagesPixelsToHide = [firsImagePixelsToHide];

        // for (let i = 0; i < images; i++) {
        //     let pixelsToHide = -imageWidth * (i + 1) + firsImagePixelsToHide;
        //     imagesPixelsToHide = [...imagesPixelsToHide, pixelsToHide]
        // }
    }

    let position: number | undefined = imagesPixelsToHide[0]

    if (!isDragging) {
        for (let i = 0; i < imagesPixelsToHide.length; i++) {
            if (imagesPixelsToHide[i] < positionX && i < imagesPixelsToHide.length - 2) {
                position = imagesPixelsToHide[i];
                break;
            }
        }
    }

    let arrayImg = [props.images[props.images.length - 1], ...props.images, props.images[0]]

    const imageCards: JSX.Element[] = arrayImg.map((image: string, key: number) => (
        <div draggable={false} key={key}>
            <img draggable={false} className={style.cursor} src={image} />
        </div>
    ));

    return (
        <div
            className={style.swiper}
            ref={setDivRef}
            style={{
                transform: `translateX(${positionX}px) translateY(${110}px)`
            }}
        >
            {imageCards}
        </div>
    );
};

export default Swipe;
