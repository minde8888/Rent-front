import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.hooks';
import { CatValues } from '../../models/product.model';
import { getProducts } from '../../redux/slice/productsSlice';
import { getAllProducts } from '../../services/products.services/products.services';
import style from './products.module.scss';

const Products = () => {
    const dispatch = useAppDispatch();
    const products = useAppSelector((state) => state.data.products);

    useEffect(() => {
        (async () => {
            const data = await getAllProducts();
            dispatch(getProducts(data));
        })();
    }, []);

    if (!Array.isArray(products.$values) || products.$values.length < 0) return null;

    const Categories = (cat: CatValues) => {
        if (cat.categoriesName !== null) {
            return (
                <Link to={cat.categoriesId}>{cat.categoriesName}</Link>
            );
        }
        return null;
    };

    let cat = products.$values.map(arr => arr.categoriesDto.$values?.map((el, k) => <Categories key={k} categoriesName={el.categoriesName} $id={el.$id} categoriesId={el.categoriesId} />))

    return (
        <div className={style.container}>
            <div className={style.top}>
                <div className={style.sort}>{cat}</div>
                <div className={style.cat}>sort</div>
            </div>
            <div className={style.content}>
                <div className={style.filter}>filter</div>
                <div>
                    {products.$values.map((data, index) => (
                        <div className={style.product} key={index}>
                            <Link to={data.productsId}>
                                <img src={data.imageSrc.$values !== undefined ? data.imageSrc.$values[0] : 'null'} />
                            </Link>
                            <div className={style.description}>
                                <Link to={data.productsId}>
                                    <div> {data.productCode}</div>
                                    <div> {data.postsDto.productName}</div>
                                    <div className={style.text}> {data.postsDto.content}</div>
                                    <div> {data.place}</div>
                                    <div> {data.size}</div>
                                    <div> {data.price}</div>
                                </Link>
                                <button>
                                    <Link to={data.productsId}>Contact</Link>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Products;
