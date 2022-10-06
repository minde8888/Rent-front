import style from './home.module.scss';
import prof1 from '../../image/adult-g85d451249_640.jpg';
import prof2 from '../../image/portrait-g64600a4f3_640.jpg';
import prof3 from '../../image/portrait-gcf634d440_640.jpg';
import prof4 from '../../image/human-g2897b2a4c_640.jpg';
import prof5 from '../../image/young-woman-g599baf728_640.jpg';
import prof6 from '../../image/happy-gc1e199d7e_640.jpg';
import Footer from './footer/footer.component';
import Hero from './hero/hero.component';
import ReactPlayer from 'react-player';

const Home = () => {
    return (
        <div className={style.home}>
            <div className={style.col_1}>
                <div className={style.row_1}>
                    <ReactPlayer url="https://www.youtube.com/watch?v=ysz5S6PUM-U" width="100%" height="100%" />
                </div>
                <div className={style.row_2}>
                    <img src={prof2} />
                    <img src={prof3} />
                </div>
            </div>
            <div className={style.col_2}>
                <div>1</div>
                <div>2</div>
                <div>3</div>
            </div>
            <div className={style.hero}>
                <Hero />
            </div>
            <div>
                <div>1</div>
                <div>2</div>
                <div>3</div>
                <div>4</div>
                <div>5</div>
                <div>6</div>
            </div>
            <div className={style.container}>
                <div className={style.text}>Take Contact With Our Creative Team</div>
                <div className={`${style.row} ${style.up}`}>
                    <div className={style.hexagon}>
                        <img src={prof1} alt="prof1" />
                    </div>
                    <div className={style.hexagon}>
                        <img src={prof2} alt="prof2" />
                    </div>
                    <div className={style.hexagon}>
                        <img src={prof3} alt="prof3" />
                    </div>
                </div>
                <div className={`${style.row} ${style.up}`}>
                    <div className={style.hexagon}>
                        <img src={prof4} alt="prof4" />
                    </div>
                    <div className={style.hexagon}>
                        <img src={prof5} alt="prof5" />
                    </div>
                </div>
                <div className={`${style.row} ${style.up}`}>
                    <div className={style.hexagon}>
                        <img src={prof6} alt="prof6" />
                    </div>
                </div>
            </div>
            <div>
                <div>1</div>
                <div>2</div>
                <div>3</div>
            </div>
            <Footer />
        </div>
    );
};
export default Home;
