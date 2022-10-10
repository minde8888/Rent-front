import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux.hooks';
import Contact from './contact/contact.component';
import style from './products.module.scss';

const Products: React.FC = () => {
    const products = useAppSelector((state) => state.data.products);
    const [toggle, setToggle] = useState<string>('');

    if (!Array.isArray(products.$values) || products.$values.length < 0) return null;

    let arrayCat: string[] = [];
    products.$values.map((arr) =>
        arr.categoriesDto.$values?.map((el, k) => {
            if (el.categoriesName) {
                arrayCat = [...arrayCat, el.categoriesName];
            }
        }));
    const uniqueCat = [...new Set(arrayCat)];

    const passToggle = (e: React.MouseEvent<HTMLButtonElement>, value: string): void => {
        setToggle(value);
    };

    return (
        <div className={style.container}>
            <div className={style.content}>
                <div className={style.filter}>
                    <div>Property type</div>
                    <Categories category={uniqueCat} />
                </div>
                <div>
                    {products.$values.map((data, index) => (
                        <div className={style.product} key={index}>
                            <Link to={data.productsId}>
                                <img src={data.imageSrc.$values !== undefined ? data.imageSrc.$values[0] : 'null'} />
                            </Link>
                            <div className={style.description}>
                                <Link to={data.productsId}>
                                    <div> {data.place}</div>
                                    <h2> {data.postsDto.productName}</h2>
                                    <div className={style.text}> {data.postsDto.content}</div>

                                    <div>
                                        Size:  {data.size}m<sup>2</sup>
                                    </div>
                                    <div>Price:  {data.price}</div>
                                </Link>
                                <button className={style.contact} type='button'>Contact  {data.phone}</button>
                            </div>
                        </div>
                    ))}
                </div>
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
                {category.map((e, k) =>
                    <div key={k}>
                        <Link to={`cat/${e}`}>{e}</Link>
                    </div>
                )}
            </>
        );
    }
    return null;
};

export default Products;
