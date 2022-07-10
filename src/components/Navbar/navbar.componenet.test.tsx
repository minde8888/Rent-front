import { fireEvent, screen } from '@testing-library/react';
import { store } from '../../redux/store';
import NavBar from './navbar.component';
import { loginSuccess } from '../../redux/slice/authSlice';
import { renderBrowserWithContext } from '../../helpers/renderWithContext.helper';
import { getUserProfile } from '../../redux/slice/userSlice';
import { User } from '../../models/user.model';

describe('<NavBar />', () => {
    test('renders', () => {
        const { baseElement } = renderBrowserWithContext(<NavBar />);
        expect(baseElement).toBeVisible();
    });

    test('render link', () => {
        const payload = { token: 'string1', refreshToken: 'string2' };
        renderBrowserWithContext(<NavBar />);
        const links: HTMLAnchorElement[] = screen.getAllByRole('link');
        expect(links[0].href).toContain('/login');
        expect(links[0].textContent).toEqual('Login');
        expect(links[1].href).toContain('/signup');
        expect(links[1].textContent).toEqual('Sign Up');
    });

    test('render links after login ', () => {
        const payload = { token: 'string1', refreshToken: 'string2' };
        const slug = '123';
        store.dispatch(loginSuccess(payload));
        store.dispatch(getUserProfile({ id: slug, name: 'Tester1', surname: 'Tester2' } as unknown as User));
        renderBrowserWithContext(<NavBar />);
        screen.debug()
        const links: HTMLAnchorElement[] = screen.getAllByRole('link'); +
            expect(links[0].href).toContain('/');
        expect(links[1].href).toContain('/products');
        expect(links[2].href).toContain('/add-products');
        expect(links[3].href).toContain(`/profile/${slug}`);
    });

    test('render logout button', () => {
        const payload = { token: 'string1', refreshToken: 'string2' };
        store.dispatch(loginSuccess(payload));
        const { getByText } = renderBrowserWithContext(<NavBar />);
        fireEvent.click(getByText('Logout'));
        expect(getByText('Login')).toBeInTheDocument();
    });
});
