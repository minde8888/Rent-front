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
    const marginTop = 110;

    if (!props.images || props.images.length === 0) return null;

    const bounds = divRef?.getBoundingClientRect();
    let imagesPixelsToHide: Array<number> = [];
    if (bounds) {
        const width = bounds.width;
        const images = props.images.length + 1;
        const imageWidth = width / (images + 1);
        const browserCenter = window.innerWidth / 2;
        const firsImagePixelsToHide = (imageWidth / 2 + imageWidth - browserCenter) * -1;
        console.log(firsImagePixelsToHide);

        imagesPixelsToHide = [firsImagePixelsToHide];

        for (let i = 0; i < images; i++) {
            let pixelsToHide = -imageWidth * (i + 1) + firsImagePixelsToHide;
            imagesPixelsToHide = [0, ...imagesPixelsToHide, pixelsToHide];
        }
    }

    let transform = {
        transform: `translateX(${positionX}px) translateY(${marginTop}px)`
    };

    if (!isDragging && imagesPixelsToHide.length > 0) {
        let closest = imagesPixelsToHide.reduce((prev, curr) => {
            return (Math.abs(curr - positionX) < Math.abs(prev - positionX) ? curr : prev);
        });
        if (closest === imagesPixelsToHide[imagesPixelsToHide.length - 1]) {
            closest = imagesPixelsToHide[imagesPixelsToHide.length - 2]
        }
        transform = { transform: `translateX(${closest}px) translateY(${marginTop}px)`, ...{ transition: 'transform 500ms ease-in-out 25ms' } };
    }

    let arrayImg = [...props.images];

    const imageCards: JSX.Element[] = arrayImg.map((image: string, key: number) => (
        <div draggable={false} key={key}>
            <img draggable={false} className={style.cursor} src={image} />
        </div>
    ));

    return (
        <div className={style.swiper} ref={setDivRef} style={transform}>
            {imageCards}
        </div>
    );
};

export default Swipe;