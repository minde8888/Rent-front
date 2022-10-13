import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from '../../../hooks/redux.hooks';
import LightBox from './lightBox/lightBox.component';
import style from './product.module.scss';

const Product: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const products = useAppSelector((state) => state.data.products);
    const product = products.productDto.$values.filter((p) => p.productsId === id);

    if (Object.keys(product).length === 0) return null;

    const onNavigate = (cat: string | undefined) => {
        navigate(`/products/cat/${cat}`);
    };

    return (
        <div className={style.container}>
            <LightBox images={product[0].imageSrc.$values} id={id} showLightBox={(): void => { }} closeLightBox={(): void => { }} />
            <div className={style.content}>
                <div className={style.col}>
                    <h1>{product[0].place}</h1>
                    <h2>{product[0].postsDto.productName}</h2>
                    <div className={style.text}>{product[0].postsDto.content}</div>
                    <div className={style.size}>
                        <b>Size : </b>
                        {product[0].size}m<sup>2</sup>
                    </div>
                    <h3 className={style.price}>Price: {product[0].price} €</h3>
                    <div className={style.contact}>
                        <b>Contact :</b> {product[0].phone}{' '}
                    </div>
                    <div className={style.categories}>
                        {product[0].categoriesDto.$values.map((e, i) => (
                            <button className={style.cat} onClick={() => onNavigate(e.categoriesName)} key={i}>
                                {e.categoriesName}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Product;
