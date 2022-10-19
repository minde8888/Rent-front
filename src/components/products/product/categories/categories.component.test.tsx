import { renderWithRouterWrapper } from '../../../../helpers/renderWithContext.helper';
import { getProducts } from '../../../../redux/slice/productsSlice';
import { store } from '../../../../redux/store';
import Categories from './categories.component';
import { screen } from '@testing-library/react';
import { response } from '../../variables/variables';

describe('<Categories />', () => {
    const setup = async () => {
        store.dispatch(getProducts(response));
        const utils = renderWithRouterWrapper('/products/cat/test-1234', '/products/cat/:cat', <Categories />);
        return {
            ...utils
        };
    };

    test('renders', async () => {
        const { baseElement, debug } = await setup();
        debug();
        expect(baseElement).toBeVisible();
    });

    test('render links', async () => {
        await setup();
        const links: HTMLAnchorElement[] = screen.getAllByRole('link');
        expect(links[0].href).toContain('/products/cat/test-1234/123');
        expect(links[1].href).toContain('/products/cat/test-1234/123');
    });

    test('render image', async () => {
        const { getByRole } = await setup();
        const image = getByRole('img');
        expect(image).toHaveAttribute('src', 'test-img');
    });
});
