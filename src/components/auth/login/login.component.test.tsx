import { renderBrowserWithContext } from '../../../helpers/renderWithContext.helper';
import Login, { InnerForm } from './login.component';
import { ComponentProps } from 'react';
import { act, cleanup, fireEvent, screen } from '@testing-library/react';
import * as reactRedux from 'react-redux';
import { loginFail, loginSuccess } from '../../../redux/slice/authSlice';
import { login } from '../../../services/auth.services/auth.services';
import { debug } from 'console';
import { store } from '../../../redux/store';
import { getUserProfile } from '../../../redux/slice/userSlice';

// describe('<Login />', () => {
//     test('renders', () => {
//         const { baseElement } = renderBrowserWithContext(<Login />);

//         expect(baseElement).toBeVisible();
//     });
//     test('should link', () => {
//         renderBrowserWithContext(<Login />);
//         const links: HTMLAnchorElement[] = screen.getAllByRole('link');

//         expect(links[0].href).toContain('/signup');
//         expect(links[0].textContent).toEqual('Sign Up');
//         expect(links[1].href).toContain('/forgot-password');
//         expect(links[1].textContent).toEqual('Forgot Password ?');
//     });

//     test('calls on submit property when clicked', async () => {
//         const mockOnSubmit = jest.fn();
//         // const user = userEvent.setup();

//         const { getByRole, getByLabelText, debug } = setupForm({ onSubmit: mockOnSubmit, message: 'mock msg' });

//         // await user.click(getByRole('button'));
//         // const submit = getByRole('button');
//         debug();
//         act(() => {
//             fireEvent.click(getByRole('button'));
//         });
//         // await user.click(screen.getByRole('button'));
//         // await user.type(get(/password/i), 'testPassword');
//         // await user.type(getByLabelText(/email/i), 'test@email.com');
//         //  await waitFor(() => expect(mockOnSubmit).toHaveBeenCalled());

//         expect(mockOnSubmit).toHaveBeenCalled();
//     });
// });

const setupForm = (properties: ComponentProps<typeof InnerForm>) => {
    return renderBrowserWithContext(<InnerForm {...properties} />);
};

afterEach(cleanup);

describe('Login', () => {
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

    beforeEach(() => {
        mockOnSubmit = jest.fn();
        const props = {
            onSubmit: mockOnSubmit,
            message: 'mock msg'
        };
        const { getByPlaceholderText, getByText } = setupForm({ ...props });

        emailNode = getByPlaceholderText('Email') as HTMLInputElement;
        passwordNode = getByPlaceholderText('Password') as HTMLInputElement;
        loginButton = getByText('Login') as HTMLButtonElement;

        act(() => {
            fireEvent.change(emailNode, { target: { value: 'test@email.com' } });
            fireEvent.change(passwordNode, { target: { value: 'testPassword' } });

            fireEvent.click(loginButton);
        });
    });

    xtest('Submits Login with email and password', () => {
        expect(mockOnSubmit).toHaveBeenCalledTimes(1);
        expect(mockOnSubmit).toHaveBeenCalledWith('test@email.com', 'test_password');
        store.dispatch(getUserProfile(user));
        store.dispatch(loginFail('error'));
    });
});

const user = {
    $id: 'string',
    token: 'string',
    refreshToken: 'string',
    id: 'string',
    name: 'string',
    surname: 'string',
    phoneNumber: 'string',
    email: 'string',
    occupation: 'string',
    roles: 'string',
    imageName: 'string'
};
