import style from './home.module.scss';

const Home = () => {
    return (
        <div className={style.home}>
            <div className={style.hero}></div>
            <div className={style.row}>
                <div className={style.hexagon_wrapper}>
                    <div className={style.hexagon}></div>
                </div>
                <div className={style.hexagon_wrapper}>
                    <div className={style.hexagon}></div>
                </div>
                <div className={style.hexagon_wrapper}>
                    <div className={style.hexagon}></div>
                </div>
            </div>
            <div className={`${style.row} ${style.up}`}>
                <div className={style.hexagon_wrapper}>
                    <div className={style.hexagon}></div>
                </div>
                <div className={style.hexagon_wrapper}>
                    <div className={style.hexagon}></div>
                </div>
            </div>
            <div className={`${style.row} ${style.up}`}>
                <div className={style.hexagon_wrapper}>
                    <div className={style.hexagon}></div>
                </div>
            </div>
        </div>
    );
};
export default Home;
