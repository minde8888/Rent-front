import { fireEvent } from '@testing-library/react';
import { renderWithContext } from '../../helpers/renderWithContext.helper';
import Profile from './profile.component';

describe('<Profile />', () => {
    test('renders', () => {
        const { baseElement } = renderWithContext(<Profile />);
        expect(baseElement).toBeVisible();
    });

    test('renders edit button', () => {
        const { getByRole, getByTestId } = renderWithContext(<Profile />);
        const currentProfile = getByTestId('current-profile');
        expect(currentProfile).toBeVisible();
        const editButton = getByRole('button');
        fireEvent.click(editButton);
        const editProfile = getByTestId('edit-profile');
        expect(editProfile).toBeVisible();
    });
});
