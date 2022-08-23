import { useRef } from 'react';
import useDrag from '../../../../../hooks/useDrag.hooks';
import style from '../lightBox.module.scss';

interface Props {
    images: Array<string> | undefined;
}

const Swipe = (props: Props) => {
    const divRef = useRef<HTMLDivElement>(null);

    const { x, pageX } = useDrag(divRef, {
        onPointerDown: () => void {},
        onPointerUp: () => void {},
        onPointerMove: () => void {}
    });

    if (!props.images || props.images.length === 0) return null;

    const imageCards: JSX.Element[] = props.images.map((image: string, key: number) => (
        <div draggable={false} key={key}>
            <img draggable={false} className={style.cursor} src={image} />
        </div>
    ));

    return (
        <div
            draggable
            ref={divRef}
            style={{
                transform: `translateX(${pageX !== 0 ? pageX - x : 0}px) translateY(${65}px)`
            }}
        >
            {imageCards}
        </div>
    );
};

export default Swipe;
