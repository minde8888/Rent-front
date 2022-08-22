import { useCallback, useRef, useState } from 'react';
import useDrag from '../../../../../hooks/useDrag';
import style from '../lightBox.module.scss';

interface Props {
    images: Array<string> | undefined;
}

let count = 0;

const Swipe = (props: Props) => {
    const divRef = useRef<HTMLDivElement>(null);
    const [translate, setTranslate] = useState({ x: 0 });

    // const dragStart = (e: DragEvent<HTMLDivElement>) => {
    //     e.stopPropagation();
    //     console.log('start: ', e.target);
    //     setPostilion(e.pageX.toString())

    //     // console.log('Data: ', data);
    // };
    const elementPosition = divRef.current?.getBoundingClientRect();
    // console.log(elementPosition);
    console.log(1111);

    const onDrag = (e: TouchEvent | MouseEvent) => {
        if (e instanceof TouchEvent) {
            // console.log(divRef.current?.getBoundingClientRect());
            // console.log(e.touches[0].pageX);
            if (divRef.current) {
                const { left } = divRef.current.getBoundingClientRect();
                // console.log('L' + left);
                // console.log('T' + e.touches);
                // console.log(e);
                const mouseX = left - e.touches[0].pageX;
                console.log(mouseX);
                console.log(e.touches[0].clientX);

                setTranslate({
                    x: e.touches[0].pageX + mouseX
                });
            }
        } else {
            setTranslate({
                x: translate.x + e.movementX
            });
        }
    };

    const drag = useDrag(divRef, translate, {
        onDrag: onDrag,
        onPointerDown: () => void {},
        onPointerUp: () => void {},
        onPointerMove: () => void {}
    });

    console.log(drag);

    if (!props.images || props.images.length === 0) return null;

    // const onDragEnd = (e: DragEvent<HTMLDivElement>) => {
    //     console.log('stop: ', e.target);
    //     let element = e.target as HTMLElement;
    //     element.style.left = e.pageX.toString() + "px";
    // };

    const imageCards: JSX.Element[] = props.images.map((image: string, key: number) => (
        <div draggable={false} key={key}>
            <img draggable={false} className={style.cursor} src={image} />
        </div>
    ));

    return (
        <div
            ref={divRef}
            style={{
                transform: `translateX(${translate.x}px) translateY(${65}px)`
            }}
        >
            {imageCards}
        </div>
    );
};

export default Swipe;
