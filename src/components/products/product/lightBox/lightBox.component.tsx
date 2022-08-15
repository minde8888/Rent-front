import { useState } from "react";



interface Props {
    images: Array<string> | undefined
}

const LightBox = (props: Props) => {
    const [imageToShow, setImageToShow] = useState<string[] | undefined>([]);
    const [lightBoxDisplay, setLightBoxDisplay] = useState(false);

    if (!props.images || props.images.length == 0) return null
    // console.log(props.images);
    // console.log(111111111);

    const imageCards: JSX.Element[] = props.images.map((image: string, key: number) => (
        <img key={key} className="image" onClick={() => showImage(image)} src={image} />
    ));

    const showImage = (image: string) => {
        setImageToShow(props.images);
        setLightBoxDisplay(true);
    };

    const hideLightBox = () => {
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
            {/* <button onClick={showPrev}>⭠</button> */}
            {imageCards}
            {/* <button onClick={showNext}>⭢</button> */}
        </div>
    )
}




export default LightBox;