import reducer, { getProducts, updateOneProduct } from '../productsSlice';
import { ResponseProducts } from '../../../models/product.model';

describe('productsSlice', () => {
    test('returns products data', () => {
        const initialState = {} as ResponseProducts;
        const newState = reducer(initialState, getProducts(response));
        expect(newState).toEqual({ ...newState, ...response });
    });

    xtest('returns updated products data', () => {
        const initialState = {} as ResponseProducts;
        const newState = reducer(initialState, updateOneProduct(products));

        // expect(newState).toEqual({ ...newState, ...userUpdate });
    });
});

const CatValues = {
    $id: '',
    categoriesId: '',
    categoriesName: '',
    description: '',
    imageName: ''
};

const product = {
    imageName: '',
    place: '',
    price: '',
    phone: '',
    email: '',
    size: '',
    productsId: '',
    sellerId: '',
    imageSrc: { $id: '', $values: [''] },
    categoriesDto: { $id: '', $values: [CatValues] },
    postsDto: {
        $id: '',
        content: '',
        postsId: '',
        productName: ''
    }
};

const products = {
    $id: '',
    $values: [{ ...product }]
};
const response = {
    $id: '',
    pageNumber: 0,
    pageSize: 0,
    firstPage: '',
    lastPage: '',
    totalPages: 0,
    totalRecords: 0,
    nextPage: '',
    previousPage: '',
    productDto: { $id: '', $values: [product] }
};
