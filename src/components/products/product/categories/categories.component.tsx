import { Link, useParams } from 'react-router-dom';
import { useAppSelector } from '../../../../hooks/redux.hook';
import { Product } from '../../../../models/product.model';
import style from './categories.module.scss';

const Categories: React.FC = () => {
    const { cat } = useParams();

    const products = useAppSelector((state) => state.data.products);

    return (
        <div className={style.container}>
            <div className={style.content}>
                {filterObject(products.productDto?.$values, cat).map((data, index) => (
                    <div className={style.product} key={index}>
                        <Link to={data.productsId}>
                            <img src={data.imageSrc.$values !== undefined ? data.imageSrc.$values[0] : 'null'} alt="cat-img" />
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
    );
};

const filterObject = (array: Product[], cat: string | undefined): Product[] => {
    let object: Product[] = [];

    if (cat !== undefined) {
        for (let i = 0; i < array.length; i++) {
            for (let j = 0; j < array[i].categoriesDto.$values.length; j++) {
                if (array[i].categoriesDto.$values[j].categoriesName === cat) {
                    object = [...object, array[i]];
                }
            }
        }
    }
    return object;
};

export default Categories;
