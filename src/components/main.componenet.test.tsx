import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import Main from './main.component';
import { Provider } from 'react-redux';
import { store } from '../redux/store';

describe('<Main />', () => {
    test('renders', () => {
        const { baseElement } = render(
            <BrowserRouter>
                <Provider store={store}>
                    <Main />
                </Provider>
            </BrowserRouter>
        );
        expect(baseElement).toBeVisible();
    });

    test('landing on a bad page', () => {
        const badRoute = '/some/bad/route';

        const { getByText } = renderMemoryRouterWithContext(badRoute, <Main />);
        expect(getByText(/There's nothing here: 404!/i)).toBeInTheDocument();
    });
    test('rendering a forgot password component that uses useLocation', () => {
        const route = '/forgot-password';

        const { getByText } = renderMemoryRouterWithContext(route, <Main />);
        expect(getByText('Forgot Password')).toBeInTheDocument();
    });
    test('rendering a signup component that uses useLocation', () => {
        const route = '/signup';

        const { getByText } = renderMemoryRouterWithContext(route, <Main />);
        expect(getByText('Sign up')).toBeInTheDocument();
    });
    test('rendering a login component that uses useLocation', () => {
        const route = '/login';

        const { container } = renderMemoryRouterWithContext(route, <Main />);
        expect(container.querySelector('h1')?.innerHTML).toEqual('Login');
    });
});

function renderMemoryRouterWithContext(route: string, element: React.ReactElement) {
    return render(
        <MemoryRouter initialEntries={[route]}>
            <Provider store={store}>
                <Main />
            </Provider>
        </MemoryRouter>
    );
}
