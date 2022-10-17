import { renderBrowserWithContext } from '../../../helpers/renderWithContext.helper';
import { getProducts } from '../../../redux/slice/productsSlice';
import { store } from '../../../redux/store';
import EditProduct from './editProduct.component';

describe('<EditProduct />', () => {
    test('renders', () => {
        store.dispatch(getProducts(data));
        const { baseElement } = renderBrowserWithContext(<EditProduct />);
        expect(baseElement).toBeVisible();
    });
});

const catValues = {
    $id: '',
    categoriesId: '88e40544-0959-441a-b403-62ebcc9947ce',
    categoriesName: '',
    description: '',
    imageName: ''
};

const product = {
    imageName: '',
    place: '',
    price: '',
    phone: '',
    email: '',
    size: '',
    productsId: '123',
    sellerId: '',
    imageSrc: { $id: '', $values: ['test-image'] },
    categoriesDto: { $id: '', $values: [catValues] },
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
