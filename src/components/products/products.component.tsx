import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.hooks';
import { CatValues } from '../../models/product.model';
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

    if (!Array.isArray(product.$values) || product.$values.length < 0) return null;
    console.log(product.$values[0].categoriesDto.$values);

    const Categories = (cat: CatValues) => {
        return (
            <div>
                <Link to={cat.categoriesId}>{cat.categoriesName}</Link>
            </div>
        );
    };

    let cat = product.$values[0].categoriesDto.$values?.map((el, k) => <Categories key={k} categoriesName={el.categoriesName} $id={el.$id} categoriesId={el.categoriesId} />);

    return (
        <div className="users">
            {product.$values.map((data, index) => (
                <div className="user" key={index}>
                    {cat}
                    <img src={data.imageSrc.$values !== undefined ? data.imageSrc.$values[0] : 'null'} />
                    <div> {data.productCode}</div>
                    <div> {data.postsDto.productName}</div>
                    <div> {data.postsDto.content}</div>
                    <div> {data.place}</div>
                    <div> {data.size}</div>
                    <div> {data.price}</div>
                    <button>
                        <Link to={data.productsId}>BOOK ROOM</Link>
                    </button>
                </div>
            ))}
        </div>
    );
};

export default Products;
