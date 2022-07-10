import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { renderWithContext } from '../../../helpers/renderWithContext.helper';
import { store } from '../../../redux/store';
import AddProduct from './addProduct.component';

describe('<CurrentProfile />', () => {
    test('renders', () => {
        const { baseElement, debug } = renderWithContext(<AddProduct />);
        expect(baseElement).toBeVisible();
    });
});
