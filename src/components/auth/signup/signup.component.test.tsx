import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { screen } from '@testing-library/dom';
import { renderBrowserWithContext } from '../../../helpers/renderWithContext.helper';
import { store } from '../../../redux/store';
import SignUp from './signup.component';

describe('<SignUp />', () => {
    test('renders', () => {
        const { baseElement } = renderBrowserWithContext(<SignUp />);

        expect(baseElement).toBeVisible();
    });
    test('should link', () => {
        const { getByText } = renderBrowserWithContext(<SignUp />);
        const LoginLink = getByText('Login');
        expect(LoginLink.textContent).toEqual('Login');
        expect(LoginLink).toBeInTheDocument();
    });
});
