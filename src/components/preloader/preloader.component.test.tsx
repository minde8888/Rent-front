import { render } from '@testing-library/react';
import Preloader from "./preloader.component";

describe('<Preloader />', () => {
    test('renders', () => {
        const { baseElement } = render(<Preloader />);
        expect(baseElement).toBeVisible();
    });
    test('renders correct eclipse.svg', () => {
        const { getByAltText } = render(<Preloader />)
        const image = getByAltText('imgAltText')
        expect(image).toHaveAttribute('src', 'eclipse.svg')
    })
})