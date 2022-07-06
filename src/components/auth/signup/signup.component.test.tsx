import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { screen } from '@testing-library/dom';
import { renderBrowserWithContext } from '../../../helpers/renderWithContext.helper';
import { store } from '../../../redux/store';
import SignUp from './signup.component';

describe('<SignUp />', () => {
    test('renders', () => {
        const { baseElement } = render(
            <BrowserRouter>
                <Provider store={store}>
                    <SignUp />
                </Provider>
            </BrowserRouter>
        );

        expect(baseElement).toBeVisible();
    });
    test('should link', () => {
        renderBrowserWithContext(<SignUp />);
        const LoginLink = screen.getByText('Login');
        expect(LoginLink.textContent).toEqual('Login');
        expect(LoginLink).toBeInTheDocument();
    });
});
