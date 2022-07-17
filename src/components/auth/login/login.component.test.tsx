import { renderBrowserWithContext } from '../../../helpers/renderWithContext.helper';
import { InnerForm } from './login.component';
import { ComponentProps } from 'react';
import { act, cleanup, fireEvent } from '@testing-library/react';

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

describe('Login form calls on submit property when clicked', () => {
    let emailNode: HTMLInputElement;
    let passwordNode: HTMLInputElement;
    let loginButtonNode: HTMLButtonElement;
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
        loginButtonNode = getByText('Login') as HTMLButtonElement;
        act(() => {
            fireEvent.change(emailNode, { target: { value: 'test@email.com' } });
            fireEvent.change(passwordNode, { target: { value: 'testPassword' } });

            fireEvent.click(loginButtonNode);
        });
    });

    xtest('Submits Login with email and password', () => {
        expect(mockOnSubmit).toHaveBeenCalledTimes(1);
        expect(mockOnSubmit).toHaveBeenCalledWith('test@email.com', 'test_password');
    });
});
