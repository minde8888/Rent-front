import { act, fireEvent, render, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { screen } from '@testing-library/dom';
import { renderBrowserWithContext, renderWithContext } from '../../../helpers/renderWithContext.helper';
import { store } from '../../../redux/store';
import Login, { InnerForm } from './login.component';
import userEvent from '@testing-library/user-event';

describe('<Login />', () => {
    test('renders', () => {
        const { baseElement, debug } = render(
            <BrowserRouter>
                <Provider store={store}>
                    <Login />
                </Provider>
            </BrowserRouter>
        );

        expect(baseElement).toBeVisible();
    });
    test('should link', () => {
        renderBrowserWithContext(<Login />);
        const links: HTMLAnchorElement[] = screen.getAllByRole('link');

        expect(links[0].href).toContain('/signup');
        expect(links[0].textContent).toEqual('Sign Up');
        expect(links[1].href).toContain('/forgot-password');
        expect(links[1].textContent).toEqual('Forgot Password ?');
    });
    test('login', async () => {
        const handleSubmit = jest.fn();
        renderBrowserWithContext(<Login />);
        const user = userEvent.setup();
        await user.type(screen.getByPlaceholderText('Email'), 'string');
        await user.type(screen.getByPlaceholderText('Password'), 'string');
        screen.debug();
        const loginButton = screen.getByRole('button');
        // await user.click(screen.getByRole('button', { name: /submit/i }));

        await waitFor(() =>
            expect(loginButton).toHaveBeenCalledWith({
                email: 'string',
                password: 'string'
            })
        );
    });
});
