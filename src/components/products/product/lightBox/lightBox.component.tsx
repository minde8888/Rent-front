import { MouseEventHandler, useState } from 'react';
import style from './lightBox.module.scss'

interface Props {
    images: Array<string> | undefined;
}


const LightBox = (props: Props) => {

    if (!props.images || props.images.length == 0) return null;

    const [lightBoxDisplay, setLightBoxDisplay] = useState(false);
    const [newClass, setNewClass] = useState("");
    const [imageToShow, setImageToShow] = useState<string | undefined>(props.images[0]);

    const imageCards: JSX.Element[] = props.images.map((image: string, key: number) => (
        <div key={key} className={'smallImg'}>
            <img className={style.cursor} onClick={() => showImage(key)} src={image} />
        </div>
    ));

    const showImage = (index: number) => {
        if (props.images) {
            setImageToShow(props.images[index]);
        }
    };

    const hideLightBox = () => {
        setLightBoxDisplay(false);
    };
    const showLightBox = (event: React.MouseEvent<HTMLElement>) => {
        setNewClass("LightBox");
    };
    const closeLightBox = () => {
        setNewClass("");
    }
    // const showNext = (e: { stopPropagation: () => void; }) => {
    //     e.stopPropagation();
    //     let currentIndex = props.images.indexOf(imageToShow);
    //     if (currentIndex >= props.images.length - 1) {
    //         setLightBoxDisplay(false);
    //     } else {
    //         let nextImage = props.images[currentIndex + 1];
    //         setImageToShow(nextImage);
    //     }
    // };

    // //show previous image in lightbox
    // const showPrev = (e: { stopPropagation: () => void; }) => {
    //     e.stopPropagation();
    //     let currentIndex = props.images.indexOf(imageToShow);
    //     if (currentIndex <= 0) {
    //         setLightBoxDisplay(false);
    //     } else {
    //         let nextImage = props.images[currentIndex - 1];
    //         setImageToShow(nextImage);
    //     }
    // };

    return (
        <div>
            {/* <button onClick={showPrev}>⭠</button> */}
            {/* {imageCards} */}
            {/* <button onClick={showNext}>⭢</button> */}
            {lightBoxDisplay ? (
                <div id="lightbox" onClick={hideLightBox}>
                    {/* <button onClick={showPrev}>⭠</button> */}
                    {/* <img id="lightbox-img" src={imageToShow[0]}></img> */}
                    {/* <button onClick={showNext}>⭢</button> */}
                </div>
            ) : (
                <div>
                    <div className={style[newClass]}>
                        <div className={style.close} style={{ display: (!newClass) ? 'none' : 'block' }} onClick={closeLightBox}>&#x274C;</div>
                        <img className={style.cursor} onClick={showLightBox} src={imageToShow} />
                    </div>
                    {imageCards}
                </div>
            )}
        </div>
    );
};

export default LightBox;
