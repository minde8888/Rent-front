import reducer, { deleteProductById, getProducts, updateOneProduct } from '../productsSlice';
import { ResponseProducts } from '../../../models/product.model';

describe('productsSlice', () => {
    test('returns products data', () => {
        const initialState = {} as ResponseProducts;
        const newState = reducer(initialState, getProducts(response));
        expect(newState).toEqual({ ...newState, ...response });
    });

    test('returns updated products data', () => {
        const initialState = response_1 as ResponseProducts;
        const newState = reducer(initialState, updateOneProduct(products));
        expect(newState).toEqual({
            $id: '',
            pageNumber: 0,
            pageSize: 0,
            firstPage: '',
            lastPage: '',
            totalPages: 0,
            totalRecords: 0,
            nextPage: '',
            previousPage: '',
            productDto: {
                $id: '',
                $values: [products]
            }
        });
    });

    test('delete products data', () => {
        const initialState = response as ResponseProducts;
        const newState = reducer(initialState, deleteProductById('123'));
        expect(newState).toEqual({
            $id: '',
            pageNumber: 0,
            pageSize: 0,
            firstPage: '',
            lastPage: '',
            totalPages: 0,
            totalRecords: 0,
            nextPage: '',
            previousPage: '',
            productDto: {
                $id: '',
                $values: []
            }
        });
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
    productsId: '123',
    sellerId: '',
    imageSrc: { $id: '', $values: [''] },
    categoriesDto: { $id: '', $values: [] },
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

const product_1 = {
    imageName: 'test',
    place: 'test',
    price: 'test',
    phone: 'test',
    email: 'test',
    size: 'test',
    productsId: '123',
    sellerId: 'test',
    imageSrc: { $id: 'test', $values: ['test'] },
    categoriesDto: { $id: '', $values: [] },
    postsDto: {
        $id: 'test',
        content: 'test',
        postsId: 'test',
        productName: 'test'
    }
};

const response_1 = {
    $id: '',
    pageNumber: 0,
    pageSize: 0,
    firstPage: '',
    lastPage: '',
    totalPages: 0,
    totalRecords: 0,
    nextPage: '',
    previousPage: '',
    productDto: { $id: '', $values: [] }
};
