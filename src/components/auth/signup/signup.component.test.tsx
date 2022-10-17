import { renderBrowserWithContext } from '../../../helpers/renderWithContext.helper';
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
