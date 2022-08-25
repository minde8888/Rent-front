import { useEffect, useState } from 'react';
import style from './lightBox.module.scss';
import Swipe from './swiper/swiper.component';

interface Props {
    images: Array<string> | undefined;
    id?: string;
}

const LightBox = (props: Props) => {
    const [lightBoxDisplay, setLightBoxDisplay] = useState(false);
    const [imageToShow, setImageToShow] = useState<string | undefined>('');

    useEffect(() => {
        setImageToShow(!props.images || props.images.length === 0 ? '' : props.images[0]);
    }, [props.images]);
    console.log(1111);

    if (!props.images || props.images.length == 0) return null;

    const imageCards: JSX.Element[] = props.images.map((image: string, key: number) => (
        <div key={key}>
            <img className={style.cursor} onClick={() => showImage(key)} src={image} />
        </div>
    ));

    const showImage = (index: number) => {
        if (props.images && Array.isArray(props.images)) {
            setImageToShow(props.images[index]);
        }
    };

    const showLightBox = () => {
        setLightBoxDisplay(true);
    };
    const closeLightBox = () => {
        setLightBoxDisplay(false);
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
            {lightBoxDisplay ? (
                <div className={style.lightBox}>
                    <div className={style.close} style={{ display: lightBoxDisplay ? 'block' : 'none' }} onClick={closeLightBox}>
                        &#x274C;
                    </div>
                    <Swipe images={props.images} />
                </div>
            ) : (
                <>
                    <div className={style.smallImg}>
                        <img className={style.cursor} onClick={showLightBox} src={imageToShow} />
                    </div>
                    {imageCards}
                </>
            )}
        </div>
    );
};

export default LightBox;
