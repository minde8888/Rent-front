import { act, fireEvent } from '@testing-library/react';
import React from 'react';
import { renderWithRouterWrapper } from '../../../helpers/renderWithContext.helper';
import { getProducts } from '../../../redux/slice/productsSlice';
import { store } from '../../../redux/store';
import Product from './product.component';

describe('<Product />', () => {
    test('renders', () => {
        store.dispatch(getProducts(data));
        const { baseElement } = renderWithRouterWrapper('/products/123', '/products/:id', <Product />);
        expect(baseElement).toBeVisible();
    });

    test('Navigate button to category', async () => {
        store.dispatch(getProducts(data));
        const { getByTestId } = renderWithRouterWrapper('/products/123', '/products/:id', <Product />);

        const saveButton = getByTestId('test-saveBtn');
        expect(saveButton).toBeVisible();
        act(() => {
            fireEvent.click(saveButton);
        });
        expect(saveButton).not.toBeVisible();
    });
});

const catValues = {
    $id: '',
    categoriesId: '88e40544-0959-441a-b403-62ebcc9947ce',
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
    imageSrc: { $id: '', $values: ['test-image'] },
    categoriesDto: { $id: '', $values: [catValues] },
    postsDto: {
        $id: '',
        content: '',
        postsId: '',
        productName: ''
    }
};

const data = {
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
