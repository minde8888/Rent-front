import { Link, useParams } from 'react-router-dom';
import { useAppSelector } from '../../../../hooks/redux.hooks';
import { Product } from '../../../../models/product.model';

const Categories: React.FC = () => {
    const { cat } = useParams();
    const products = useAppSelector((state) => state.data.products);

    return (
        <div>
            {filterObject(products.$values, cat).map((e, k) => (
                <div key={k}>
                    <Link to={e.productsId}>
                        <img src={e.imageSrc.$values !== undefined ? e.imageSrc.$values[0] : 'null'} alt={'cat-alt'} />
                    </Link>
                    <div>{e.postsDto.productName}</div>
                    <div>{e.postsDto.content}</div>
                </div>
            ))}
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
