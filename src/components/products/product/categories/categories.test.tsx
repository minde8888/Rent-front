import { render } from 'react-dom';
import { renderBrowserWithContext, renderWithRouterWrapper } from '../../../../helpers/renderWithContext.helper';
import { getProducts } from '../../../../redux/slice/productsSlice';
import { store } from '../../../../redux/store';
import Categories from './categories.component';

describe('<Categories />', () => {
    test('renders', () => {
        store.dispatch(getProducts(response));
        const { baseElement, debug } = renderWithRouterWrapper('/products/cat/123', '/products/cat/:cat', <Categories />);
        debug();
        expect(baseElement).toBeVisible();
    });
});
sad;
const catValues = {
    $id: '',
    categoriesId: '123',
    categoriesName: '',
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
