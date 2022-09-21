import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../../hooks/redux.hooks'; //;
import LightBox from './lightBox/lightBox.component';

const Product: React.FC = () => {
    const { id } = useParams();
    const products = useAppSelector((state) => state.data.products);
    const product = products.$values.filter((p) => p.productsId === id);

    if (Object.keys(product).length === 0) return null;

    return (
        <div>
            <div>{product[0].place}</div>
            <div>{product[0].price}</div>
            <div>{product[0].phone}</div>
            <div>{product[0].email}</div>
            <div>{product[0].postsDto.productName}</div>
            <div>{product[0].postsDto.content}</div>
            <div>
                {product[0].size}m<sup>2</sup>
            </div>
            <LightBox images={product[0].imageSrc.$values} id={id} showLightBox={(): void => {}} closeLightBox={(): void => {}} />
        </div>
    );
};

export default Product;
