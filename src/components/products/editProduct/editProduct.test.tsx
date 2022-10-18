import { renderBrowserWithContext } from '../../../helpers/renderWithContext.helper';
import { getProducts } from '../../../redux/slice/productsSlice';
import { store } from '../../../redux/store';
import { response } from '../variables/variables';
import EditProduct from './editProduct.component';

describe('<EditProduct />', () => {
    test('renders', () => {
        store.dispatch(getProducts(response));
        const { baseElement } = renderBrowserWithContext(<EditProduct />);
        expect(baseElement).toBeVisible();
    });
});
