import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';

interface Props {
    images: Array<string> | undefined;
}

const LightBox = (props: Props) => {
    if (!props.images || props.images.length == 0) return null;
    console.log(props.images[0]);

    return (
        <div>
            {/* <button onClick={showPrev}>⭠</button> */}
            {imageCards}
            {/* <button onClick={showNext}>⭢</button> */}
            {lightBoxDisplay ? (
                <div id="lightbox" onClick={hideLightBox}>
                    {/* <button onClick={showPrev}>⭠</button> */}
                    {/* <img id="lightbox-img" src={imageToShow[0]}></img> */}
                    {/* <button onClick={showNext}>⭢</button> */}
                </div>
            ) : (
                ''
            )}
        </div>
    );
};

export default LightBox;
