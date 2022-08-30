import { useState } from 'react';
import style from './lightBox.module.scss';
import Swipe from './swiper/swiper.component';

interface Props {
    images: Array<string> | undefined;
    id?: string;
}

const LightBox = (props: Props) => {
    const [lightBoxDisplay, setLightBoxDisplay] = useState(false);
    const [imageToShow, setImageToShow] = useState<string | undefined>('');

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
                        <img className={style.cursor} onClick={showLightBox} src={imageToShow === "" ? props.images[0] : imageToShow} />
                    </div>
                    {imageCards}
                </>
            )}
        </div>
    );
};

export default LightBox;
