import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader

interface Props {
    images: Array<string> | undefined;
}

const LightBox = (props: Props) => {
    if (!props.images || props.images.length == 0) return null;
    console.log(props.images[0]);

    return <div>11111</div>;
};

export default LightBox;
