import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import { renderBrowserWithContext, renderWithContext } from '../../../helpers/renderWithContext.helper';
import Login, { InnerForm } from './login.component';
import { ComponentProps } from 'react';

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

    const SetupForm = (properties: ComponentProps<typeof InnerForm>) => {
        return renderWithContext(<InnerForm {...properties} />);
    };

    test('calls on submit property when clicked', async () => {
        const mockOnSubmit = jest.fn();
        render(<SetupForm handleSubmit={mockOnSubmit} message={''} />);
        screen.debug();
    });
});
