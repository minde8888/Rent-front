import { renderBrowserWithContext } from '../../../helpers/renderWithContext.helper';
import Login, { InnerForm } from './login.component';
import { ComponentProps } from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { debug } from 'console';


const setupForm = (properties: ComponentProps<typeof InnerForm>) => {
    return renderBrowserWithContext(<InnerForm {...properties} />);
};

describe('<Login />', () => {
    test('renders', () => {
        const { baseElement } = renderBrowserWithContext(<Login />);
        debug();
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

    let emailNode: HTMLInputElement;
    let passwordNode: HTMLInputElement;
    let loginButton: HTMLButtonElement;
    let mockOnSubmit: jest.Mock<any, any>;

    test('Submits Login with email and password', async () => {
        const props = {
            onSubmit: jest.fn(),
            message: 'mock msg'
        };
        const { getByPlaceholderText, getByText } = setupForm({ ...props });

        emailNode = getByPlaceholderText('Email') as HTMLInputElement;
        passwordNode = getByPlaceholderText('Password') as HTMLInputElement;
        loginButton = getByText('Login') as HTMLButtonElement;

        const user = userEvent.setup();

        await user.type(emailNode, 'test@email.com');
        await user.type(passwordNode, 'Test_password1!');
        await user.click(loginButton);

        await waitFor(() => {
            expect(props.onSubmit).toHaveBeenCalledTimes(1);
            expect(props.onSubmit).toHaveBeenCalledWith({
                email: 'test@email.com',
                password: 'Test_password1!'
            });
        })
    });
});


