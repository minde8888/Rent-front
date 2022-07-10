import { act, fireEvent, render } from '@testing-library/react';
import Edit from './profileEdit.component';
import { Provider } from 'react-redux';
import { store } from '../../../redux/store';
import { renderWithContext } from '../../../helpers/renderWithContext.helper';

describe('<Edit />', () => {
    test('renders', () => {
        const { baseElement } = renderWithContext(
            <Edit passToggle={jest.fn()} />
        );
        expect(baseElement).toBeVisible();
    });
    test('renders add-image-frame-svgrepo-com.svg as image src', () => {
        const { getByAltText } = renderWithContext(
            <Edit passToggle={jest.fn()} imageSrc={{ $id: 'string', $values: ['add-image-frame-svgrepo-com.svg'] }} />
        );
        const image = getByAltText('editAltImageName');
        expect(image).toHaveAttribute('src', 'add-image-frame-svgrepo-com.svg');
    });
    test('renders go back button', async () => {
        const passToggle = jest.fn();
        const { getByText } = render(
            <Provider store={store}>
                <Edit passToggle={passToggle} />
            </Provider>
        );
        const goBackButton = getByText(/Go back/);
        expect(goBackButton).toBeVisible();
        await act(async () => {
            fireEvent.click(goBackButton);
        });
        expect(passToggle).toHaveBeenCalled();
    });
});
