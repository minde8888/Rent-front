import { renderWithContext } from '../../helpers/renderWithContext.helper';
import PageNotFound from './pageNotFound';

describe('<PageNotFound />', () => {
    test('renders', () => {
        const { baseElement } = renderWithContext(<PageNotFound />);
        expect(baseElement).toBeVisible();
    });
    test('should link', () => {
        const { getByText, debug } = renderWithContext(<PageNotFound />);
        const link = getByText('BACK TO HOMEPAGE');
        expect(link.getAttribute('href')).toBe('/');
    });
});
