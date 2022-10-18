import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux.hooks';
import Pagination from '../pagination/pagination';
import style from './products.module.scss';

const Products: React.FC = () => {
    const products = useAppSelector((state) => state.data.products);
    const [currentPage, setCurrentPage] = useState(1);

    if (!Array.isArray(products.productDto?.$values) || products.productDto?.$values.length < 0) return null;
    const { firstPage, lastPage, previousPage, nextPage, pageNumber, pageSize, totalPages, totalRecords } = products;

    let arrayCat: string[] = [];
    products.productDto?.$values.map((arr) =>
        arr.categoriesDto?.$values?.map((el) => {
            if (el.categoriesName) {
                return (arrayCat = [...arrayCat, el.categoriesName.trim()]);
            }
        })
    );
    const uniqueCat = [...new Set(arrayCat)];

    return (
        <div className={style.container}>
            <div className={style.content}>
                <div className={style.filter}>
                    <h2>Property type</h2>
                    <Categories category={uniqueCat} />
                </div>
                <div className={style.col}>
                    {products.productDto.$values.map((data, index) => (
                        <div className={style.product} key={index}>
                            <Link to={data.productsId}>
                                <img src={data.imageSrc.$values !== undefined ? data.imageSrc.$values[0] : 'null'} alt="alt-product" />
                            </Link>
                            <div className={style.description}>
                                <Link to={data.productsId}>
                                    <div className={style.place}> {data.place}</div>
                                    <h2> {data.postsDto.productName}</h2>
                                    <div className={style.text}> {data.postsDto.content}</div>
                                    <div className={style.size}>
                                        <b>Size:</b> {data.size}m<sup>2</sup>{' '}
                                    </div>
                                    <div>
                                        <b>Price : </b> {data.price}
                                    </div>
                                </Link>
                                <button className={style.contact} type="button">
                                    Contact &#10093;&#10093;&#10093; {data.phone}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="container">
                <Pagination previousPage={previousPage} nextPage={nextPage} currentPage={pageNumber} totalPages={totalPages} maxLength={7} setCurrentPage={setCurrentPage} />
            </div>
        </div>
    );
};

interface Cat {
    category: string[];
}

const Categories = ({ category }: Cat): JSX.Element | null => {
    if (Array.isArray(category) && category.length !== 0) {
        return (
            <>
                {category.map((e, k) => (
                    <Link key={k} to={`cat/${e}`}>
                        {e}
                    </Link>
                ))}
            </>
        );
    }
    return null;
};

export default Products;
