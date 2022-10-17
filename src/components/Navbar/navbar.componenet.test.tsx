import { fireEvent, screen } from '@testing-library/react';
import { store } from '../../redux/store';
import NavBar from './navbar.component';
import { loginSuccess } from '../../redux/slice/authSlice';
import { renderBrowserWithContext } from '../../helpers/renderWithContext.helper';
import { getUserProfile } from '../../redux/slice/userSlice';
import { User } from '../../models/user.model';

describe('<NavBar />', () => {
    const setup = async () => {
        const utils = renderBrowserWithContext(<NavBar />)
        return {
            ...utils
        };
    };
    test('renders', async () => {
        const { baseElement } = await setup();
        expect(baseElement).toBeVisible();
    });

    test('render link', async () => {
        await setup();
        const links: HTMLAnchorElement[] = screen.getAllByRole('link');
        expect(links[0].href).toContain('/');
        expect(links[1].href).toContain('/products');
        expect(links[2].textContent).toEqual('LOGO');
        expect(links[3].href).toContain('/login');
        expect(links[3].textContent).toEqual('Login');
        expect(links[4].href).toContain('/signup');
        expect(links[4].textContent).toEqual('Sign Up');
    });

    test('render links after login', async () => {
        const payload = { token: 'string1', refreshToken: 'string2' };
        const slug = '123';
        store.dispatch(loginSuccess(payload));
        store.dispatch(getUserProfile({ id: slug, name: 'Tester1', surname: 'Tester2' } as unknown as User));
        await setup();
        const links: HTMLAnchorElement[] = screen.getAllByRole('link');
        expect(links[0].href).toContain('/');
        // expect(links[1].href).toContain('/products');
        // expect(links[2].href).toContain('/add-products');
        // expect(links[3].href).toContain(`/profile/${slug}`);
    });

    test('render logout button', async () => {
        const payload = { token: 'string1', refreshToken: 'string2' };
        store.dispatch(loginSuccess(payload));
        const { getByText } = await setup();;
        fireEvent.click(getByText('Logout'));
        expect(getByText('Login')).toBeInTheDocument();
    });
});
