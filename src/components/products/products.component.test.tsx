import { renderBrowserWithContext } from '../../helpers/renderWithContext.helper';
import Products from './products.component';

describe('<Products />', () => {
    test('renders', () => {
        const { baseElement } = renderBrowserWithContext(<Products />);
        expect(baseElement).toBeVisible();
    });
});
