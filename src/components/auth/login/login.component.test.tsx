import { screen } from '@testing-library/dom';
import { renderBrowserWithContext } from '../../../helpers/renderWithContext.helper';
import Login, { InnerForm } from './login.component';
import { ComponentProps } from 'react';
import { act, fireEvent } from '@testing-library/react';

const setupForm = (properties: ComponentProps<typeof InnerForm>) => {
    return renderBrowserWithContext(<InnerForm {...properties} />);
};

describe('<Login />', () => {
    test('renders', () => {
        const { baseElement } = renderBrowserWithContext(<Login />);

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

    test('calls on submit property when clicked', async () => {
        const mockOnSubmit = jest.fn();

        const { getByRole } = setupForm({ onSubmit: mockOnSubmit, message: 'mock msg' });
        const submit = getByRole('button');
        act(() => {
            fireEvent.click(submit);
        });
    });
});
