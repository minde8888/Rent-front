import reducer, { addProductCategory, deleteProductById, deleteProductCategoryById, getProducts, updateOneProduct, updateProductCategory } from '../productsSlice';
import { ResponseProducts } from '../../../models/product.model';

describe('productsSlice', () => {
    test('returns products data', () => {
        const initialState = {} as ResponseProducts;
        const newState = reducer(initialState, getProducts(response));
        expect(newState).toEqual({ ...newState, ...response });
    });

    test('returns updated products data', () => {
        const initialState = responseEmptyProduct as ResponseProducts;
        const newState = reducer(initialState, updateOneProduct(product));
        expect(newState).toEqual({ ...responseWithProducts });
    });

    test('delete products data', () => {
        const initialState = response as ResponseProducts;
        const newState = reducer(initialState, deleteProductById('123'));
        expect(newState).toEqual({ ...responseEmptyProduct });
    });
    test('add category to product', () => {
        const initialState = response as ResponseProducts;
        const newState = reducer(initialState, addProductCategory(categories));
        expect(newState).toEqual({ ...responseWithProductsCategory });
    });

    test('edit category values', () => {
        const initialState = response as ResponseProducts;
        const newState = reducer(initialState, updateProductCategory(catValues));
        expect(newState).toEqual({ ...responseWithProductsCategory });
    });

    test('edit category values', () => {
        const initialState = response as ResponseProducts;
        const newState = reducer(initialState, deleteProductCategoryById({ id: '1234', productsId: '123' }));
        expect(newState).toEqual({ ...response });
    });
});

const categories = {
    $id: '',
    categoriesId: '1234',
    categoriesName: '',
    description: '',
    imageName: '',
    productsId: '123'
};

const catValues = {
    category: [categories],
    productsId: '123'
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
const productWithCategory = {
    imageName: '',
    place: '',
    price: '',
    phone: '',
    email: '',
    size: '',
    productsId: '123',
    sellerId: '',
    imageSrc: { $id: '', $values: [''] },
    categoriesDto: { $id: '', $values: [categories] },
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
    firstPage: 0,
    lastPage: 0,
    totalPages: 0,
    totalRecords: 0,
    nextPage: 0,
    previousPage: 0,
    productDto: {
        $id: '',
        $values: [product]
    }
};

const responseWithProducts = {
    $id: '',
    pageNumber: 0,
    pageSize: 0,
    firstPage: 0,
    lastPage: 0,
    totalPages: 0,
    totalRecords: 0,
    nextPage: 0,
    previousPage: 0,
    productDto: {
        $id: '',
        $values: [product]
    }
};

const responseWithProductsCategory = {
    $id: '',
    pageNumber: 0,
    pageSize: 0,
    firstPage: 0,
    lastPage: 0,
    totalPages: 0,
    totalRecords: 0,
    nextPage: 0,
    previousPage: 0,
    productDto: {
        $id: '',
        $values: [productWithCategory]
    }
};

const responseEmptyProduct = {
    $id: '',
    pageNumber: 0,
    pageSize: 0,
    firstPage: 0,
    lastPage: 0,
    totalPages: 0,
    totalRecords: 0,
    nextPage: 0,
    previousPage: 0,
    productDto: {
        $id: '',
        $values: []
    }
};
