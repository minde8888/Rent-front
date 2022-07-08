import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from '../../redux/store';
import NavBar from './navbar.component';
import { loginSuccess } from '../../redux/slice/authSlice';
import { renderBrowserWithContext } from '../../helpers/renderWithContext.helper';
import { getUserProfile } from '../../redux/slice/userSlice';
import { User } from '../../models/user.model';

describe('<NavBar />', () => {
    test('renders', () => {
        const { baseElement } = render(
            <BrowserRouter>
                <Provider store={store}>
                    <NavBar />
                </Provider>
            </BrowserRouter>
        );
        expect(baseElement).toBeVisible();
    });

    test('should link', () => {
        renderBrowserWithContext(<NavBar />);
        const links: HTMLAnchorElement[] = screen.getAllByRole('link');
        expect(links[0].href).toContain('/');
        expect(links[1].href).toContain('/products');
        expect(links[2].href).toContain('/add-products');
        expect(links[3].href).toContain('/login');
        expect(links[3].textContent).toEqual('Login');
        expect(links[4].href).toContain('/signup');
        expect(links[4].textContent).toEqual('Sign Up');
    });
    test('logout and profile link', () => {
        const payload = { token: 'string1', refreshToken: 'string2' };
        const slug = '123';
        store.dispatch(loginSuccess(payload));
        store.dispatch(getUserProfile({ id: slug, name: 'Tester1', surname: 'Tester2' } as unknown as User));

        const { getByText, container } = renderBrowserWithContext(<NavBar />);
        expect(container.querySelector('.profile')).toHaveAttribute('href', `/profile/${slug}`);
        fireEvent.click(getByText('Logout'));
        expect(getByText('Login')).toBeInTheDocument();
    });
});
