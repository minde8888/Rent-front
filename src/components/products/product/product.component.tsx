import { useParams } from 'react-router-dom';
import { getProduct } from '../../../services/products.services/products.services';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux.hooks';
import { getOneProduct } from '../../../redux/slice/productSlice';
import { useEffect } from 'react';
import LightBox from './lightBox/lightBox.component';

const Product: React.FC = () => {
    const { id } = useParams();
    const dispatch = useAppDispatch();

    useEffect(() => {
        (async () => {
            if (id) {
                const data = await getProduct(id);
                dispatch(getOneProduct(data));
            }
        })();
    }, []);

    const product = useAppSelector((state) => state.data.product);

    if (Object.keys(product).length === 0) return null;

    return (
        <div>
            <div>{product.$values[0].place}</div>
            <div>{product.$values[0].price}</div>
            <div>{product.$values[0].productCode}</div>
            <div>{product.$values[0].postsDto.productName}</div>
            <div>{product.$values[0].postsDto.content}</div>
            <div>{product.$values[0].size}</div>
            <LightBox images={product.$values[0].imageSrc.$values} id={id} showLightBox={(): void => {}} closeLightBox={(): void => {}} />
        </div>
    );
};

export default Product;
