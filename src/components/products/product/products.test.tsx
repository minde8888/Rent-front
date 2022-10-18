import { act, fireEvent } from '@testing-library/react';
import { renderWithRouterWrapper } from '../../../helpers/renderWithContext.helper';
import { getProducts } from '../../../redux/slice/productsSlice';
import { store } from '../../../redux/store';
import { response } from '../variables/variables';
import Product from './product.component';

describe('<Product />', () => {
    const setup = async () => {
        store.dispatch(getProducts(response));
        const utils = renderWithRouterWrapper('/products/123', '/products/:id', <Product />);
        return {
            ...utils
        };
    };

    test('renders', async () => {
        const { baseElement } = await setup();
        expect(baseElement).toBeVisible();
    });

    test('Navigate button to category', async () => {
        const { getByTestId } = await setup();
        const saveButton = getByTestId('test-saveBtn');
        expect(saveButton).toBeVisible();
        act(() => {
            fireEvent.click(saveButton);
        });
        expect(saveButton).not.toBeVisible();
    });
});

//
