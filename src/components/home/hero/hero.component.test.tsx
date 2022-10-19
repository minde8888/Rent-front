import { render } from '@testing-library/react';
import Hero from './hero.component';

describe('<Hero />', () => {
    test('renders', () => {
        const { baseElement } = render(<Hero />);
        expect(baseElement).toBeVisible();
    });
    test('renders component', () => {
        const { getByText } = render(<Hero />);
        expect(getByText('This is something')).toBeVisible();
        expect(getByText('Very special')).toBeVisible();
        expect(getByText('Special is the key')).toBeVisible();
        expect(getByText('For you')).toBeVisible();
        expect(getByText('Just give it')).toBeVisible();
        expect(getByText('A try')).toBeVisible();
        expect(getByText('And see')).toBeVisible();
        expect(getByText('How IT Works')).toBeVisible();
        expect(getByText('Woo')).toBeVisible();
    });
});
