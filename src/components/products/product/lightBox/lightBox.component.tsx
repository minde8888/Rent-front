import { useState } from 'react';
import style from './lightBox.module.scss';
import Swipe from './swiper/swiper.component';

interface Props {
    images: Array<string> | undefined;
    id?: string;
    showLightBox: () => void;
    closeLightBox: () => void;
    role?: string;
    role1?: string;
    role2?: string;
}

const LightBox = ({ images, role = "role-images", role1 = "role-images-1", role2 = "role-images-2" }: Props) => {
    const [lightBoxDisplay, setLightBoxDisplay] = useState(false);
    const [imageToShow, setImageToShow] = useState<string | undefined>('');

    if (!images || images.length === 0) return null;

    const imageCards: JSX.Element[] = images.map((image: string, key: number) => (
        <div className={style.smallImages} key={key}>
            <img role={role} className={style.cursor} onClick={() => showImage(key)} src={image} alt={'product_alt_text'} />
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

    return (
        <div>
            {lightBoxDisplay ? (
                <div className={style.lightBox}>
                    <div role={role1} className={style.close} style={{ display: lightBoxDisplay ? 'block' : 'none' }} onClick={closeLightBox}>
                        &#x274C;
                    </div>
                    <Swipe images={images} />
                </div>
            ) : (
                <>
                    <div className={style.bigImage}>
                        <img role={role2} className={style.cursor} onClick={showLightBox} src={imageToShow === '' ? images[0] : imageToShow} alt={'product_alt_text'} />
                    </div>
                    <div className={style.smallImagesContainer}>
                        {imageCards}
                    </div>

                </>
            )}
        </div>
    );
};

export default LightBox;
