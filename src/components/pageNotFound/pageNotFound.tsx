import style from './pageNotFound.module.scss';

const PageNotFound = () => {
    return (
        <div className={style.notFound}>
            <h1>404</h1>
            <h2>OOPS, THE PAGE YOU ARE LOOKING FOR CAN'T BE FOUND!</h2>
            <div className="has-text-centered">
                <a href="/" className="button is-rounded has-text-success ">
                    BACK TO HOMEPAGE
                </a>
            </div>
        </div>
    );
};

export default PageNotFound;
