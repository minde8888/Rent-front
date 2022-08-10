import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.hooks';
import { getProducts } from '../../redux/slice/productSlice';
import { getAllProducts } from '../../services/product.services/product.services';

const Products = () => {
    const dispatch = useAppDispatch();
    const product = useAppSelector((state) => state.data.product);

    useEffect(() => {
        (async () => {
            const data = await getAllProducts();
            dispatch(getProducts(data));
        })();
    }, []);

    console.log(product.$values);

    return (
        <div className="users">
            {product.$values.map((data) => (
                <div className="user">{data.price}</div>
            ))}
        </div>
    );
};

export default Products;
