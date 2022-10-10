import Social from '../home/social/social.component';
import style from './footer.module.scss';

const Footer = () => {
    return (
        <div className={style.footer}>
            <Social />
        </div>
    );
};

export default Footer;
