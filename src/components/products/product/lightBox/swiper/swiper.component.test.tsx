import { render } from '@testing-library/react';
import { Direction } from '../lightBox.component';
import Swipe from './swiper.component';

describe('<Swipe />', () => {
    test('renders', () => {
        const { baseElement } = render(<Swipe images={['test_images']} changeImage={Direction.Start} />);
        expect(baseElement).toBeVisible();
    });

    test.each<[string, string]>([['renders images src', 'test_images']])('%s', (description, img) => {
        const { getAllByRole } = render(<Swipe images={['test_images']} changeImage={Direction.Start} />);
        const image = getAllByRole('role-images');
        for (let i = 0; i < image.length; i++) {
            expect(image[i]).toHaveAttribute('src', img);
        }
    });

    test('renders images styles', () => {
        const { getByRole } = render(<Swipe images={['test_images']} changeImage={Direction.Start} />);
        const element = getByRole('role-images');
        const styles = getComputedStyle(element);
        const imageStyle = {
            width: `${window.innerWidth * 0.8}px`,
            margin: `0px ${window.innerWidth * 0.2}px`
        };
        expect(styles.margin).toBe(imageStyle.margin);
        expect(styles.width).toBe(imageStyle.width);
    });
});
