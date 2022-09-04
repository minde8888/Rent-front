import { useState } from 'react';
import style from './lightBox.module.scss';
import Swipe from './swiper/swiper.component';

interface Props {
    images: Array<string> | undefined;
    id?: string;
    showLightBox: () => void;
    closeLightBox: () => void;
}

export enum Direction {
    Start = "START",
    Left = "LEFT",
    Right = "RIGHT",
}

const LightBox = ({ images }: Props) => {
    const [lightBoxDisplay, setLightBoxDisplay] = useState(false);
    const [imageToShow, setImageToShow] = useState<string | undefined>('');
    const [changeImage, setChangeImage] = useState<Direction>(Direction.Start);

    if (!images || images.length == 0) return null;

    const imageCards: JSX.Element[] = images.map((image: string, key: number) => (
        <div key={key}>
            <img role="role-images" className={style.cursor} onClick={() => showImage(key)} src={image} />
        </div>
    ));

    const showImage = (index: number) => {
        if (images && Array.isArray(images)) {
            setImageToShow(images[index]);
        }
    };

    const showLightBox = () => {
        setLightBoxDisplay(true);
    };
    const closeLightBox = () => {
        setLightBoxDisplay(false);
    };
    const clickRight = () => {
        setChangeImage(Direction.Right)

    }
    const clickLeft = () => {
        setChangeImage(Direction.Left)
    }

    return (
        <div>
            {lightBoxDisplay ? (
                <div className={style.lightBox}>
                    <div role="role-images-1" className={style.close} style={{ display: lightBoxDisplay ? 'block' : 'none' }} onClick={closeLightBox}>
                        &#x274C;
                    </div>
                    <div className={style.arrow}>
                        <div className={style.right} onClick={clickRight}>
                            &#10096;
                        </div>
                        <div className={style.left} onClick={clickLeft}>
                            &#10097;
                        </div>
                    </div>

                    <Swipe images={images} changeImage={changeImage} />
                </div>
            ) : (
                <>
                    <div className={style.smallImg}>
                        <img role="role-images-2" className={style.cursor} onClick={showLightBox} src={imageToShow === "" ? images[0] : imageToShow} />
                    </div>
                    {imageCards}
                </>
            )}
        </div>
    );
};

export default LightBox;
