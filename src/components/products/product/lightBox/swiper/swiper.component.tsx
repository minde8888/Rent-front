import { useState, useCallback } from 'react';
import useDrag from '../../../../../hooks/useDrag.hooks';
import style from '../lightBox.module.scss';

interface Props {
    images: Array<string> | undefined;
}

const Swipe = ({ images }: Props) => {
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
        const imageWidth = width / picture;
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

    let index = 0;

    if (!isDragging && imagesPixelsToHide.length > 0 && positionX !== 0) {
        index = Closest(imagesPixelsToHide, positionX);

        if (positionX < imagesPixelsToHide[index] && index < imagesPixelsToHide.length - 1) {
            index += 1;
        }
        if (positionX > -startPositionX && index > 0) {
            index -= 1;
        }
        transform = TransformPosition(imagesPixelsToHide, index, marginTop);
    }

    const imageStyle = {
        width: `${window.innerWidth * 0.8}px`,
        margin: `0px ${window.innerWidth * 0.2}px`
    };

    const imageCards: JSX.Element[] = images.map((image: string, key: number) => (
        <div draggable={false} key={key}>
            <img role="role-images" style={imageStyle} draggable={false} className={style.cursor} src={image} />
        </div>
    ));

    // console.log(index);

    // console.log(indexImage);
    console.log(111);

    return (
        <>
            {/* <div className={style.arrow}>
                <div className={style.right} onClick={rightClick}>
                    &#10096;
                </div>
                <div className={style.left} onClick={leftClick}>
                    &#10097;
                </div>
            </div> */}
            <Arrows index={index} imagesPixelsToHide={imagesPixelsToHide} marginTop={marginTop} />
            <div className={style.swiper} ref={setDivRef} style={transform}>
                {imageCards}
            </div>
        </>
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

function TransformPosition(imagesPixelsToHide: number[], index: number, marginTop: number) {
    return {
        transform: `translateX(${imagesPixelsToHide[index]}px) translateY(${marginTop}px)`,
        ...{ transition: 'transform 350ms ease-in-out 15ms' }
    };
}

interface ArrowProps {
    index: number;
    imagesPixelsToHide: number[];
    marginTop: number;
}

function Arrows({ index, imagesPixelsToHide, marginTop }: ArrowProps) {
    const [indexImage, setIndexImage] = useState({});
    const rightClick = () => {
        if (index > 0) {
            index -= 1;
            console.log(index);
            // setIndexImage(TransformPosition(imagesPixelsToHide, index, marginTop));
            // console.log(transform);
            // setIndexImage(transform);
            // setIndexImage((prevState) => ({
            //     ...prevState,
            //     transform
            // }));
        }
    };
    const leftClick = () => {
        if (imagesPixelsToHide.length - 1 > index) {
            index += 1;
            console.log(index);

            // setIndexImage(TransformPosition(imagesPixelsToHide, index, marginTop));
            // console.log(transform);

            // setIndexImage(transform);
        }
    };
    console.log(indexImage);

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
