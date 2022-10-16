import { act, fireEvent, screen } from '@testing-library/react';
import { renderBrowserWithContext, renderWithContext } from '../../../../helpers/renderWithContext.helper';
import { getProducts } from '../../../../redux/slice/productsSlice';
import { store } from '../../../../redux/store';
import EditAllProducts from './editAllProducts.component';

describe('<EditAllProducts />', () => {
    test('renders', () => {
        const { baseElement } = renderWithContext(<EditAllProducts />);
        expect(baseElement).toBeVisible();
    });

    test('renders edit button', async () => {
        const { getByTestId } = renderBrowserWithContext(<EditAllProducts />);
        await act(async () => {
            store.dispatch(getProducts(data));
        });
        const button = getByTestId('test-deleteBtn');
        expect(button).toBeVisible();
        fireEvent.click(button);
        expect(button).not.toBeVisible();
    });

    test('renders images', async () => {
        const { getByAltText } = renderBrowserWithContext(<EditAllProducts />);
        await act(async () => {
            store.dispatch(getProducts(data));
        });
        const image = getByAltText('edit_alt_images');
        expect(image).toHaveAttribute('src', 'test-image');
    });
    test('should link', () => {
        renderBrowserWithContext(<EditAllProducts />);
        const links: HTMLAnchorElement[] = screen.getAllByRole('link');
        expect(links[0].href).toContain('/');
        expect(links[1].href).toContain('/');
    });
});

const product = {
    imageName: '',
    place: '',
    price: '',
    phone: '',
    email: '',
    size: '',
    productsId: '',
    sellerId: '',
    imageSrc: { $id: '', $values: ['test-image'] },
    categoriesDto: { $id: '', $values: [] },
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

