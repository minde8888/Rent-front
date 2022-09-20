import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux.hooks';
import { getProducts } from '../../../../redux/slice/productsSlice';
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
        removeProduct(id)
    }

    if (!Array.isArray(products.$values) || products.$values.length < 0) return null;

    return (
        <div className={style.container}>
            <div className={style.content}>
                <div>
                    {products.$values.map((data, index) => (
                        <div className={style.product} key={index}>
                            <Link to={data.productsId}>
                                <img src={data.imageSrc.$values !== undefined ? data.imageSrc.$values[0] : 'null'} alt={"edit_alt_images"} />
                            </Link>
                            <div className={style.description}>
                                <Link to={data.productsId}>
                                    <div> {data.phone}</div>
                                    <div> {data.email}</div>
                                    <div> {data.postsDto.productName}</div>
                                    <div className={style.text}> {data.postsDto.content}</div>
                                    <div> {data.place}</div>
                                    <div> {data.size}m<sup>2</sup></div>
                                    <div> {data.price}</div>
                                </Link>
                            </div>
                            <button className={style.close} onClick={() => deleteProduct(data.productsId)} type="button">
                                ❌
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};


export default EditAllProducts;
