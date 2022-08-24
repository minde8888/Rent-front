import { useRef } from 'react';
import useDrag from '../../../../../hooks/useDrag.hooks';
import style from '../lightBox.module.scss';

interface Props {
    images: Array<string> | undefined;
}

const Swipe = (props: Props) => {
    const divRef = useRef<HTMLDivElement>(null);

    const { startX, pageX } = useDrag(divRef, {
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
    console.log('startX ' + startX);
    console.log('pageX ' + pageX);
    console.log('translateX' + (pageX - startX));

    return (
        <div
            ref={divRef}
            style={{
                transform: `translateX(${pageX !== 0 ? pageX - startX : 0}px) translateY(${65}px)`
            }}
        >
            {imageCards}
        </div>
    );
};

export default Swipe;
