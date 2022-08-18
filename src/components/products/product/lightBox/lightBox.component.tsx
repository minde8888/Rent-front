import { MouseEventHandler, useState } from 'react';
import style from './lightBox.module.scss';

interface Props {
    images: Array<string> | undefined;
}

const LightBox = (props: Props) => {
    const [lightBoxDisplay, setLightBoxDisplay] = useState(false);
    const [newClass, setNewClass] = useState('');
    const [imageToShow, setImageToShow] = useState<string | undefined>(!props.images || props.images.length == 0 ? '' : props.images[0]);

    if (!props.images || props.images.length == 0) return null;

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

    const showLightBox = () => {
        setNewClass('LightBox');
    };
    const closeLightBox = () => {
        setNewClass('');
    };
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
            <div className={style[newClass]}>
                <div className={style.close} style={{ display: !newClass ? 'none' : 'block' }} onClick={closeLightBox}>
                    &#x274C;
                </div>
                <img className={style.cursor} onClick={showLightBox} src={imageToShow} />
            </div>
            {imageCards}
        </div>
    );
};

export default LightBox;
