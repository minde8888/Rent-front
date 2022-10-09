import style from './home.module.scss';
import prof1 from '../../image/adult-g85d451249_640.jpg';
import prof2 from '../../image/portrait-g64600a4f3_640.jpg';
import prof3 from '../../image/portrait-gcf634d440_640.jpg';
import prof4 from '../../image/human-g2897b2a4c_640.jpg';
import prof5 from '../../image/young-woman-g599baf728_640.jpg';
import prof6 from '../../image/happy-gc1e199d7e_640.jpg';
import image1 from '../../image/spain-83365_640.jpg';
import image2 from '../../image/swimming-2392283_640.jpg';
import image3 from '../../image/hotel-389256_640.jpg';
import image4 from '../../image/bedroom-490779_640.jpg';
import image5 from '../../image/bedroom-5664221_640.jpg';
import image6 from '../../image/hotel-1831072_640.jpg';
import image7 from '../../image/beach-6301597_640.jpg'
import image8 from '../../image/bedroom-490779_640.jpg'
import Footer from '../footer/footer.component';
import Hero from './hero/hero.component';
import ReactPlayer from 'react-player/youtube';
import { useAppSelector } from '../../hooks/redux.hooks';
import { Link } from 'react-router-dom';


const Home = () => {
    const products = useAppSelector((state) => state.data.products);

    if (!Array.isArray(products.$values) || products.$values.length < 0) return null;

    return (
        <div className={style.home}>
            <div className={style.col_1}>
                <div className={style.row_1}>
                    <ReactPlayer url="https://www.youtube.com/watch?v=6F-hjdpMc1U" width="100%" height="100%" playing controls={false} muted={true} />
                </div>
                <div className={style.row_2}>
                    <img src={image1} />
                    <img src={image2} />
                </div>
            </div>
            <div className={style.title}>
                <h1 className={style.desc_1}>Lorem Ipsum</h1>
            </div>
            <div className={style.col_2}>
                <div className={style.box_1}>
                    <div className={style.box}>
                        <img src={image3} alt="hotel" />
                        <h2>
                            Lorem Ipsum
                        </h2>
                        <div>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                        </div>
                    </div>
                    <div className={style.box}>
                        <img src={image4} alt="hotel" />
                        <h2>
                            Lorem Ipsum
                        </h2>
                        <div>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                        </div>
                    </div>
                </div>
                <div className={style.box_2}>
                    <div className={style.box}>
                        <img src={image5} alt="hotel" />
                        <h2>
                            Lorem Ipsum
                        </h2>
                        <div>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                        </div>
                    </div>
                    <div className={style.box}>
                        <img src={image6} alt="hotel" />
                        <h2>
                            Lorem Ipsum
                        </h2>
                        <div>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                        </div>
                    </div>
                </div>
            </div>
            <div className={style.title}>
                <h1 className={style.desc_2}>Lorem Ipsum</h1>
            </div>
            <Hero />
            <div className={style.title}>
                <h1 className={style.desc_1} >Lorem Ipsum</h1>
            </div>
            <div className={style.col_3}>
                <div className={style.box}>
                    <img src={image7} />
                    <div className={style.box_desc}>
                        <h2>Why do we use it?</h2>
                        <div>
                            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
                        </div>
                    </div>
                </div>
                <div className={style.box}>
                    <div className={style.box_desc}>
                        <h2>What is Lorem Ipsum?</h2>
                        <div>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                        </div>
                    </div>
                    <img src={image8} />
                </div>
            </div>

            <div className={style.container}>
                <h2 className={style.text}>
                    Take Contact With Our Creative Team
                </h2>
                <div className={`${style.row} ${style.up}`}>
                    <div className={style.hexagon}>
                        <div className={style.phone}>
                            +11111111111111111
                        </div>
                        <img src={prof1} alt="prof1" />
                    </div>
                    <div className={style.hexagon}>
                        <div className={style.phone}>
                            +11111111111111111
                        </div>
                        <img src={prof2} alt="prof2" />
                    </div>
                    <div className={style.hexagon}>
                        <div className={style.phone}>
                            +11111111111111111
                        </div>
                        <img src={prof3} alt="prof3" />
                    </div>
                </div>
                <div className={`${style.row} ${style.up}`}>
                    <div className={style.hexagon}>
                        <div className={style.phone}>
                            +11111111111111111
                        </div>
                        <img src={prof4} alt="prof4" />
                    </div>
                    <div className={style.hexagon}>
                        <div className={style.phone}>
                            +11111111111111111
                        </div>
                        <img src={prof5} alt="prof5" />
                    </div>
                </div>
                <div className={`${style.row} ${style.up}`}>
                    <div className={style.hexagon}>
                        <div className={style.phone}>
                            +11111111111111111
                        </div>
                        <img src={prof6} alt="prof6" />
                    </div>
                </div>
            </div>
            <div className={style.title}>
                <h1>Where does it come from?</h1>
            </div>
            <div className={style.cal_desc}>
                Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.
            </div>
            <div className={style.col_4}>
                {products.$values.map((data, index) => (
                    <div className={style.box} key={index}>
                        <Link to={`products/${data.productsId}`}>
                            <img src={data.imageSrc.$values !== undefined && index < 4 ? data.imageSrc.$values[0] : 'null'} />
                            <div className={style.desc}>
                                <div>{data.place}</div>
                                <div>{data.size}m<sup>2</sup></div>
                                <div>{data.price} €</div>
                            </div>
                        </Link>
                    </div>))}
            </div>
        </div>
    );
};
export default Home;
