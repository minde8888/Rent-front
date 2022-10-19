import { render } from '@testing-library/react';
import Footer from './footer.component';

describe('<Footer />', () => {
    test('renders', () => {
        const { baseElement } = render(<Footer />);
        expect(baseElement).toBeVisible();
    });
    test('renders Copyright', () => {
        const { getByText } = render(<Footer />);
        expect(getByText('© Copyright 2022 Mindaugas Baltrunas . All rights reserved.')).toBeVisible();
    });
});
