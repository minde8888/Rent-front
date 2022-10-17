import { act, waitFor } from '@testing-library/react';
import { renderBrowserWithContext } from '../../../helpers/renderWithContext.helper';
import SignUp from './signup.component';

describe('<SignUp />', () => {
    const setup = async () => {
        const utils = renderBrowserWithContext(<SignUp />)
        return {
            ...utils
        };
    };
    test('renders', async () => {
        const { baseElement } = await setup();
        act(() => {
            expect(baseElement).toBeVisible()
        });
    });
    test('should link', async () => {
        const { getByText } = await setup();
        const LoginLink = getByText('Login');
        act(() => {
            expect(LoginLink.textContent).toEqual('Login')
        });
        act(() => {
            expect(LoginLink).toBeInTheDocument()
        });
    });
});
