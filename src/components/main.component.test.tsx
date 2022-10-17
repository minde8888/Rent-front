import { act } from '@testing-library/react';
import '@testing-library/jest-dom';
import Main from './main.component';
import { renderBrowserWithContext, renderMemoryRouterWithContext } from '../helpers/renderWithContext.helper';

describe('<Main />', () => {
    const setup = async (route = '') => {
        const utils = renderMemoryRouterWithContext(route, <Main />)
        return {
            ...utils
        };
    };

    test('renders', async () => {
        const { baseElement } = await setup();
        act(() => {
            expect(baseElement).toBeVisible();
        });
    });

    test('landing on a 404 page', async () => {
        const badRoute = '/some/bad/route';
        const { getByText } = await setup(badRoute);
        act(() => {
            expect(getByText(/OOPS, THE PAGE YOU ARE LOOKING FOR CAN'T BE/i)).toBeInTheDocument();
        });
    });
    test('rendering a forgot password component that uses useLocation', async () => {
        const route = '/forgot-password';
        const { getByText } = await setup(route);
        act(() => {
            expect(getByText('Forgot Password')).toBeInTheDocument();
        });
    });
    test('rendering a login component that uses useLocation', async () => {
        const route = '/login';
        const { container } = await setup(route);
        act(() => {
            expect(container.querySelector('h1')?.innerHTML).toEqual('Login');
        });
    });
    test('rendering a signup component that uses useLocation', async () => {
        const route = '/signup';
        const { getByText } = await setup(route);
        act(() => {
            expect(getByText('Sign up')).toBeInTheDocument();
        });
    });
});
