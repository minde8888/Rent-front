import { fireEvent, render } from "@testing-library/react";
import LightBox from "./lightBox.component";


describe('<LightBox />', () => {
    test('renders', () => {
        const { baseElement } = render(<LightBox showLightBox={jest.fn()} images={["test_images_1"]} closeLightBox={jest.fn()} />);
        expect(baseElement).toBeVisible();
    });

    test.each<[string, string]>([
        ["renders images src", "test_images_1"]
    ])('%s', (description, img) => {
        const { getAllByRole } = render(<LightBox showLightBox={jest.fn()} closeLightBox={jest.fn()} images={["test_images_1"]} />);
        const image = getAllByRole('role-images');
        for (let i = 0; i < image.length; i++) {
            expect(image[i]).toHaveAttribute('src', img);
        }
    });

    test('renders onclick show/hide lightBox', () => {
        const { getByRole } = render(<LightBox showLightBox={jest.fn()} closeLightBox={jest.fn()} images={["test_images_1"]} />);

        const showLightBox_1 = getByRole("role-images-2");
        fireEvent.click(showLightBox_1);
        const closeLightBox = getByRole("role-images-1");
        expect(closeLightBox).toBeVisible();
        fireEvent.click(closeLightBox);
        const showLightBox_2 = getByRole("role-images-2");
        expect(showLightBox_2).toBeVisible();
    });
})
