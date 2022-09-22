import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux.hooks';
import { getProducts, deleteProductById } from '../../../../redux/slice/productsSlice';
import { getAllProducts, removeProduct } from '../../../../services/products.services/products.services';
import style from './editAllProducts.module.scss';

const EditAllProducts: React.FC = () => {
    const dispatch = useAppDispatch();
    const products = useAppSelector((state) => state.data.products);

    /* eslint-disable */
    useEffect(() => {
        (async () => {
            const data = await getAllProducts();
            dispatch(getProducts(data));
        })();
    }, []);
    /* eslint-disable */

    const deleteProduct = (id: string) => {
        removeProduct(id);
        dispatch(deleteProductById(id));
    };

    if (!Array.isArray(products.$values) || products.$values.length < 0) return null;

    return (
        <div className={style.container}>
            {products.$values.map((data, index) => (
                <div className={style.product} key={index}>
                    <div className={style.images}>
                        <Link to={data.productsId}>
                            <img src={data.imageSrc.$values !== undefined ? data.imageSrc.$values[0] : 'null'} alt={'edit_alt_images'} />
                        </Link>
                    </div>
                    <div className={style.description}>
                        <Link to={data.productsId}>
                            {/* <div> {data.phone}</div>
                            <div> {data.email}</div> */}
                            <h2> {data.postsDto.productName}</h2>
                            <h3> {data.place}</h3>
                            <div className={style.text}> {data.postsDto.content}</div>
                            <div>
                                <b>Size : </b>
                                {data.size}m<sup>2</sup>
                            </div>
                            <div>
                                <b>Price : </b>
                                {data.price}
                            </div>
                        </Link>
                        <button className={style.close} onClick={() => deleteProduct(data.productsId)} type="button">
                            ❌
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default EditAllProducts;
