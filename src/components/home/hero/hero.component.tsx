import style from './hero.module.scss';

const Hero = () => {
    return (
        <div className={style.container}>
            <div className={style.carousel}>
                <div className={style.carousel__face}>
                    <span>This is something</span>
                </div>
                <div className={style.carousel__face}>
                    <span>Very special</span>
                </div>
                <div className={style.carousel__face}>
                    <span>Special is the key</span>
                </div>
                <div className={style.carousel__face}>
                    <span>For you</span>
                </div>
                <div className={style.carousel__face}>
                    <span>Just give it</span>
                </div>
                <div className={style.carousel__face}>
                    <span>A try</span>
                </div>
                <div className={style.carousel__face}>
                    <span>And see</span>
                </div>
                <div className={style.carousel__face}>
                    <span>How IT Works</span>
                </div>
                <div className={style.carousel__face}>
                    <span>Woo</span>
                </div>
            </div>
        </div>
    );
};

export default Hero;
