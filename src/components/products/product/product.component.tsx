import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../../hooks/redux.hooks';
import LightBox from './lightBox/lightBox.component';
import style from './product.module.scss';

const Product: React.FC = () => {
    const { id } = useParams();
    const products = useAppSelector((state) => state.data.products);
    const product = products.$values.filter((p) => p.productsId === id);

    if (Object.keys(product).length === 0) return null;

    return (
        <div className={style.container}>
            <LightBox images={product[0].imageSrc.$values} id={id} showLightBox={(): void => {}} closeLightBox={(): void => {}} />
            <div className={style.content}>
                <h1>{product[0].place}</h1>
                <h2>{product[0].postsDto.productName}</h2>

                <div>{product[0].phone}</div>
                <div>{product[0].email}</div>
                <div className={style.text}>{product[0].postsDto.content}</div>
                <div className={style.size}>
                    <b>Size : </b>
                    {product[0].size}m<sup>2</sup>
                </div>
                <h3 className={style.price}>Price {product[0].price} €</h3>
            </div>
        </div>
    );
};

export default Product;
