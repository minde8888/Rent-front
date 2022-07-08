import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../../redux/store';
import AddProduct from './addProduct.component';

describe('<CurrentProfile />', () => {
    test('renders', () => {
        const { baseElement, debug } = render(
            <Provider store={store}>
                <AddProduct />
            </Provider>
        );
        expect(baseElement).toBeVisible();
    });
});
