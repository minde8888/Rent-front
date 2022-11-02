import { renderBrowserWithContext, renderWithContext } from '../../helpers/renderWithContext.helper';
import { getProducts } from '../../redux/slice/productsSlice';
import { store } from '../../redux/store';
import { response } from '../products/variables/variables';
import Home from './home.component';

describe('<Home />', () => {
    const setup = async () => {
        store.dispatch(getProducts(response));
        const utils = renderBrowserWithContext(<Home />);
        return {
            ...utils
        };
    };

    test('renders', async () => {
        const { baseElement } = await setup();
        expect(baseElement).toBeVisible();
    });

    test('renders all images', async () => {
        const { getAllByAltText, getByAltText } = await setup();
        const primeImg = getByAltText('alt_prime_img');
        const homeImg = getAllByAltText('alt_home');
        const hotelImg = getAllByAltText('alt_hotel');
        const profileImg = getAllByAltText('alt_prof');
        const productImg = getAllByAltText('alt-product');

        expect(primeImg).toHaveAttribute('src', 'swimming-2392283_640.jpg');
        expect(homeImg).toHaveLength(2);
        expect(hotelImg).toHaveLength(4);
        expect(profileImg).toHaveLength(6);
        expect(productImg).toHaveLength(1);
    });

    test('render link to product', async () => {
        const { getByRole } = await setup();
        const link = getByRole('link');
        expect(link).toBeVisible();
    });
});
