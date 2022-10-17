import { renderBrowserWithContext, renderWithRouterWrapper } from '../../../../helpers/renderWithContext.helper';
import { getProducts } from '../../../../redux/slice/productsSlice';
import { store } from '../../../../redux/store';
import Categories from './categories.component';
import { act, screen } from '@testing-library/react';

describe('<Categories />', () => {
    const setup = async () => {
        store.dispatch(getProducts(response));
        const utils = renderWithRouterWrapper('/products/cat/test-1234', '/products/cat/:cat', <Categories />);
        return {
            ...utils
        };
    };

    test('renders', async () => {
        const { baseElement } = await setup();
        expect(baseElement).toBeVisible();
    });

    test('render links', async () => {
        await setup();
        const links: HTMLAnchorElement[] = screen.getAllByRole("link");
        expect(links[0].href).toContain("/products/cat/test-1234/88e40544-0959-441a-b403-62ebcc9947ce");
        expect(links[1].href).toContain("/products/cat/test-1234/88e40544-0959-441a-b403-62ebcc9947ce");
    })

    test('render image', async () => {
        const { getByRole } = await setup();
        const image = getByRole('img');
        expect(image).toHaveAttribute('src', 'test-img');
    });
});

const catValues = {
    $id: '',
    categoriesId: '123',
    categoriesName: 'test-1234',
    description: '',
    imageName: ''
};

const product = {
    imageName: '',
    place: 'Test',
    price: '',
    phone: '',
    email: '',
    size: '',
    productsId: '88e40544-0959-441a-b403-62ebcc9947ce',
    sellerId: '',
    imageSrc: { $id: '', $values: ['test-img'] },
    categoriesDto: { $id: '', $values: [catValues] },
    postsDto: {
        $id: '',
        content: '',
        postsId: '',
        productName: ''
    }
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
