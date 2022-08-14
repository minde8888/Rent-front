import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';


interface Props {
    images: Array<string> | undefined
}

const LightBox = (props: Props) => {
    if (!props.images || props.images.length == 0) return null
    console.log(props.images[0]);

    return (
        <Carousel>
            <div>
                <img src={props.images[0]} />
                <p className="legend">Legend 1</p>
            </div>
            <div>
                <img src={props.images[1]} />
                <p className="legend">Legend 2</p>
            </div>
            <div>
                src={props.images[2]}
                <p className="legend">Legend 3</p>
            </div>
        </Carousel>
    )
}

export default LightBox;