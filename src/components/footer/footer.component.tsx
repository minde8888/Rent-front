import Social from './social/social.component';
import style from './footer.module.scss';

const Footer = () => {
    return (
        <div className={style.footer}>
            <Social />
            <div className={style.copy}>© Copyright 2022 Mindaugas Baltrunas . All rights reserved.</div>
        </div>
    );
};

export default Footer;
