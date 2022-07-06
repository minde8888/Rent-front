import { fireEvent, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import Profile from './profile.component';

describe('<Profile />', () => {
    test('renders', () => {
        const { baseElement } = render(
            <Provider store={store}>
                <Profile />
            </Provider>
        );
        expect(baseElement).toBeVisible();
    });

    test('renders edit button', () => {
        const { getByRole, getByTestId } = render(
            <Provider store={store}>
                <Profile />
            </Provider>
        );
        const currentProfile = getByTestId('current-profile');
        expect(currentProfile).toBeVisible();
        const editButton = getByRole('button');
        fireEvent.click(editButton);
        const editProfile = getByTestId('edit-profile');
        expect(editProfile).toBeVisible();
    });
});
