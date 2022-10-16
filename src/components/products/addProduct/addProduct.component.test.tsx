import { renderWithContext } from '../../../helpers/renderWithContext.helper';
import AddProduct from './addProduct.component';

describe('<CurrentProfile />', () => {
    test('renders', () => {
        const { baseElement, debug } = renderWithContext(<AddProduct />);
        expect(baseElement).toBeVisible();
        debug()
    });
});
