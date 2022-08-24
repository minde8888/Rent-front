import { useRef } from 'react';
import useDrag from '../../../../../hooks/useDrag.hooks';
import style from '../lightBox.module.scss';

interface Props {
    images: Array<string> | undefined;
}

const Swipe = (props: Props) => {
    const divRef = useRef<HTMLDivElement>(null);

    const { positionX } = useDrag(divRef, {
        onPointerDown: () => void {},
        onPointerUp: () => void {},
        onPointerMove: () => void {}
    });

    if (!props.images || props.images.length === 0) return null;

    const imageCards: JSX.Element[] = props.images.map((image: string, key: number) => (
        <div draggable={false} key={key} >
            <img draggable={false} className={style.cursor} src={image} />
        </div>
    ));

    return (
        <div
            className={style.swiper}
            ref={divRef}
            style={{
                transform: `translateX(${positionX}px) translateY(${110}px)`
            }}
        >
            {imageCards}
        </div>
    );
};

export default Swipe;
