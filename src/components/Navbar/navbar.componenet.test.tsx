import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Router } from 'react-router-dom';
import { store } from '../../redux/store';
import NavBar from './navbar.component';
import { loginSuccess } from '../../redux/slice/authSlice';
import { renderBrowserWithContext } from '../../helpers/renderWithContext.helper';

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
    test('logout', () => {
        const payload = { token: 'string1', refreshToken: 'string2' };
        store.dispatch(loginSuccess(payload));
        renderBrowserWithContext(<NavBar />);

        const logoutButton = screen.getByText('Logout');
        expect(logoutButton).toBeVisible();
        fireEvent.click(logoutButton);
        expect(screen.getByText('Login')).toBeInTheDocument();
    });
    // test('render profile link', () => {
    //     const { debug } = render(
    //         <BrowserRouter>
    //             <Provider store={store}>
    //                 <NavBar />
    //             </Provider>
    //         </BrowserRouter>
    //     );

    //     //    {
    //     //       route: '/profile/ABC123',
    //     //       path: '/profile/:id'
    //     //   }
    // });
});
