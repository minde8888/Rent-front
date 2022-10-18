import { fireEvent } from '@testing-library/react';
import { renderBrowserWithContext } from '../../../../../helpers/renderWithContext.helper';
import { catValues } from '../../../variables/variables';
import AddRemoveInputField from './addRemoveInputField';

describe('<EditProduct />', () => {
    const setup = () => {
        const { getByTestId } = renderBrowserWithContext(<AddRemoveInputField productsId={'88e40544-0959-441a-b403-62ebcc9947ca'} categories={[catValues]} />);
        const addNewCategoryField = getByTestId('test-addField-id');
        expect(addNewCategoryField).toBeVisible();
        fireEvent.click(addNewCategoryField);
        const input = getByTestId('test-input-id');
        return {
            input
        };
    };
    test('Renders', () => {
        const { baseElement } = renderBrowserWithContext(<AddRemoveInputField productsId={'88e40544-0959-441a-b403-62ebcc9947ca'} categories={[catValues]} />);
        expect(baseElement).toBeVisible();
    });
    test('Add/Remove new category buttons', () => {
        const { getByTestId } = renderBrowserWithContext(<AddRemoveInputField productsId={'88e40544-0959-441a-b403-62ebcc9947ca'} categories={[catValues]} />);
        const addNewCategoryField = getByTestId('test-addField-id');
        expect(addNewCategoryField).toBeVisible();
        fireEvent.click(addNewCategoryField);
        const input_1 = getByTestId('test-input-id');
        expect(input_1).toBeVisible();
        const removeCategoryField = getByTestId('test-remove-id');
        fireEvent.click(removeCategoryField);
        expect(input_1).not.toBeVisible();
        fireEvent.click(addNewCategoryField);
        const input_2 = getByTestId('test-input-id');
        expect(input_2).toBeVisible();
    });
    test('It should keep a category in front of the input', () => {
        const { input } = setup();
        fireEvent.change(input, { target: { value: 'test-input' } });
        let result = (input as HTMLInputElement).value;
        expect(result).toBe('test-input');
    });
    test('It should allow a category to be in the input when the value is changed', () => {
        const { input } = setup();
        fireEvent.change(input, { target: { value: 'test-input' } });
        let result = (input as HTMLInputElement).value;
        expect(result).toBe('test-input');
    });
    test('It should not allow letters to be inputted', () => {
        const { input } = setup();
        let result = (input as HTMLInputElement).value;
        expect(result).toBe('');
        fireEvent.change(input, { target: { value: 'test-input' } });
        expect(result).toBe('');
    });
    test('It should allow the category to be deleted', () => {
        const { input } = setup();
        fireEvent.change(input, { target: { value: 'test-input' } });
        let result_1 = (input as HTMLInputElement).value;
        expect(result_1).toBe('test-input');
        fireEvent.change(input, { target: { value: '' } });
        let result_2 = (input as HTMLInputElement).value;
        expect(result_2).toBe('');
    });
});
