import { act } from 'react-dom/test-utils';
import { renderBrowserWithContext } from '../../../helpers/renderWithContext.helper';
import ForgotPassword from './forgotPassword.component';

describe('<SignUp />', () => {
    const setup = async () => {
        const utils = renderBrowserWithContext(<ForgotPassword />);
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
    test('renders title and paragraph text', async () => {
        const { getByText } = await setup();
        act(() => {
            expect(getByText('Forgot Password')).toBeInTheDocument();
        });
        act(() => {
            expect(getByText('This can be your application')).toBeInTheDocument();
        });
    });
});
