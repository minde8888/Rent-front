import { act, fireEvent } from '@testing-library/react';
import Edit from './profileEdit.component';
import { renderWithContext } from '../../../helpers/renderWithContext.helper';

describe('<Edit />', () => {
    test('renders', () => {
        const { baseElement } = renderWithContext(<Edit passToggle={jest.fn()} />);
        expect(baseElement).toBeVisible();
    });
    test('renders add-image-frame-svgrepo-com.svg as image src', () => {
        const { getByAltText } = renderWithContext(<Edit passToggle={jest.fn()} imageSrc={{ $id: 'string', $values: ['add-image-frame-svgrepo-com.svg'] }} />);
        const image = getByAltText('editAltImageText');
        expect(image).toHaveAttribute('src', 'add-image-frame-svgrepo-com.svg');
    });

    test('renders go back button', async () => {
        const passToggle = jest.fn();
        const { getByText } = renderWithContext(<Edit passToggle={passToggle} />);
        const goBackButton = getByText(/Go back/);
        expect(goBackButton).toBeVisible();
        await act(async () => {
            fireEvent.click(goBackButton);
        });
        expect(passToggle).toHaveBeenCalled();
    });
});
