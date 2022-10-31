import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux.hook';
import Pagination from '../pagination/pagination.component';
import style from './products.module.scss';

const Products: React.FC = () => {
    const products = useAppSelector((state) => state.data.products);
    const categories = useAppSelector((state) => state.data.categories);

    if (!Array.isArray(products.productDto?.$values) || products.productDto?.$values.length < 0) return null;
    const { firstPage, lastPage, previousPage, nextPage, pageNumber, pageSize, totalPages, totalRecords } = products;

    let arrayCat: string[] = [];
    categories.$values?.map((el) => {
        if (el.categoriesName) {
            return (arrayCat = [...arrayCat, el.categoriesName.trim()]);
        }
    })

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
                                    <h2> {data.postsDto?.productName}</h2>
                                    <div className={style.text}> {data.postsDto?.content}</div>
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
                <Pagination
                    firstPage={firstPage ?? 0}
                    nextPage={nextPage ?? 0}
                    pageNumber={pageNumber ?? 0}
                    lastPage={lastPage ?? 0}
                    pageSize={pageSize ?? 0}
                    previousPage={previousPage ?? 0}
                    totalPages={totalPages ?? 0}
                    totalRecords={totalRecords ?? 0}
                />
            </div>
        </div>
    );
};

interface Cat {
    category: string[];
}

const Categories = ({ category }: Cat): JSX.Element | null => {
    let arr = category.filter(elem => elem != "")

    if (Array.isArray(arr) && arr.length !== 0) {
        return (
            <>
                {arr.map((e, k) => (
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
