import { MemoryRouter, Route } from "react-router-dom";
import { renderBrowserWithContext, renderMemoryRouterWithContext, renderWithDynamicRouter } from "../../../helpers/renderWithContext.helper";
import { getProducts } from "../../../redux/slice/productsSlice";
import { store } from "../../../redux/store";
import Product from "./product.component";


describe('<Product />', () => {
    jest.mock('react-router-dom', () => ({
        ...jest.requireActual('react-router-dom'),
        useParams: () => ({
            id: '123',
        }),
    }));

    test('renders', () => {
        store.dispatch(getProducts(data));
        const { baseElement } = renderBrowserWithContext(<Product />);
        expect(baseElement).toBeVisible();
    });

    test('renders', () => {
        store.dispatch(getProducts(data));
        const { getByTestId, debug } = renderMemoryRouterWithContext("products/:id", <Product />,);
        debug()
        const saveButton = getByTestId("test-saveBtn");
        expect(saveButton).toBeVisible();
    });
});


const catValues = {
    $id: '',
    categoriesId: "88e40544-0959-441a-b403-62ebcc9947ce",
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


