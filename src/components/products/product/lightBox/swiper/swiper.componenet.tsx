import { useCallback, useRef, useState } from 'react';
import useDrag from '../../../../../hooks/useDrag.hooks';
import style from '../lightBox.module.scss'

interface Props {
    images: Array<string> | undefined;
}

const Swipe = (props: Props) => {

    const divRef = useRef<HTMLDivElement>(null);
    const [translate, setTranslate] = useState({ x: 0 });

    if (!props.images || props.images.length == 0) return null;

    // const dragStart = (e: DragEvent<HTMLDivElement>) => {
    //     e.stopPropagation();
    //     console.log('start: ', e.target);
    //     setPostilion(e.pageX.toString())

    //     // console.log('Data: ', data);
    // };
    const onDrag = useCallback((e: TouchEvent | MouseEvent) => {

        if (e instanceof TouchEvent) {
            // console.log(divRef.current?.getBoundingClientRect());
            // console.log(e.touches[0].pageX);

            // const { left } = divRef.current.getBoundingClientRect();
            // console.log(e.touches[0].pageX - (e.touches[0].pageX - left));
            console.log(clientX);

            setTranslate({
                x: e.touches[0].pageX + (e.touches[0].pageX - clientX)
            });

        } else {


            setTranslate({
                x: translate.x + e.movementX
            });
        }

    }, [translate]);
    console.log(translate);


    const { clientX, clientY } = useDrag(divRef, {
        onDrag: onDrag,
        onPointerDown: () => void {},
        onPointerUp: () => void {},
        onPointerMove: () => void {}
    });

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



