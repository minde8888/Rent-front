import { act, fireEvent } from '@testing-library/react';
import { renderBrowserWithContext } from '../../../../helpers/renderWithContext.helper';
import { getProducts, updateProductCategory } from '../../../../redux/slice/productsSlice';
import { store } from '../../../../redux/store';
import EditCategory from './editCategory';

describe('<EditCategory />', () => {
    const setup = () => {
        const onCancel = jest.fn();
        const utils = renderBrowserWithContext(<EditCategory categories={[catValues]} productsId={''} onCancel={onCancel} />);
        const input = utils.getByTestId('test-inputs-id');
        return {
            input,
            ...utils,
            onCancel
        };
    };

    test('renders', () => {
        const { baseElement } = setup();
        expect(baseElement).toBeVisible();
    });
    test('Close modal button', () => {
        const { onCancel, getByTestId } = setup();
        const closeBtn = getByTestId('test-close-id');
        fireEvent.click(closeBtn);
        expect(onCancel).toHaveBeenCalled();
    });
    test('Remove category button', async () => {
        const { getByTestId } = setup();
        const removeBtn = getByTestId('test-removeCategory-id');
        expect(removeBtn).toBeVisible();
        store.dispatch(getProducts(response));
        await act(async () => {
            fireEvent.click(removeBtn);
        });
        expect(removeBtn).not.toBeVisible();
    });
    test('It should keep a category in front of the input', () => {
        const { input } = setup();
        fireEvent.change(input, { target: { value: 'test-category_1' } });
        let result = (input as HTMLInputElement).value;
        expect(result).toBe('test-category_1');
    });
    test('It should allow a category to be in the input when the value is changed', () => {
        const { input } = setup();
        fireEvent.change(input, { target: { value: 'test-category_2' } });
        let result = (input as HTMLInputElement).value;
        expect(result).toBe('test-category_2');
    });
    test('It should not allow letters to be inputted', () => {
        const { input } = setup();
        let result = (input as HTMLInputElement).value;
        expect(result).toBe('');
        fireEvent.change(input, { target: { value: 'test-category_3' } });
        expect(result).toBe('');
    });
    test('It should allow the category to be deleted', () => {
        const { input } = setup();
        fireEvent.change(input, { target: { value: 'test-category_4' } });
        let result_1 = (input as HTMLInputElement).value;
        expect(result_1).toBe('test-category_4');
        fireEvent.change(input, { target: { value: '' } });
        let result_2 = (input as HTMLInputElement).value;
        expect(result_2).toBe('');
    });
    test('Save category button', async () => {
        const { getByText } = setup();
        const saveBtn = getByText('Save');
        expect(saveBtn).toBeVisible();
        store.dispatch(getProducts(response));
        store.dispatch(
            updateProductCategory({
                category: [catValues],
                productsId: product.productsId
            })
        );
        await act(async () => {
            fireEvent.click(saveBtn);
        });
        expect(saveBtn).toBeVisible();
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
    place: 'Test',
    price: '',
    phone: '',
    email: '',
    size: '',
    productsId: '',
    sellerId: '',
    imageSrc: { $id: '', $values: [''] },
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
    firstPage: 0,
    lastPage: 0,
    totalPages: 0,
    totalRecords: 0,
    nextPage: 0,
    previousPage: 0,
    productDto: { $id: '', $values: [product] }
};
