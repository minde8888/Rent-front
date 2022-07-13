import App from './App';
import { renderBrowserWithContext } from './helpers/renderWithContext.helper';

describe('<App />', () => {
    test('renders', () => {
        const { baseElement } = renderBrowserWithContext(<App />);
        expect(baseElement).toBeVisible();
    });
});
