import { render } from '@testing-library/react';
import { ProfileImage } from '../../models/user.model';
import CurrentProfile from './currentProfile.component';

describe('<CurrentProfile />', () => {
    test('renders', () => {
        const { baseElement, debug } = render(<CurrentProfile passToggle={jest.fn()} />)
        expect(baseElement).toBeVisible()
    })
    // test('renders correct image src', () => {
    //     const { getByAltText } = render(<CurrentProfile passToggle={jest.fn()} imageSrc={{ $id: "string", $values: ["string"] }} imageName="imgAltText" />)
    //     // debug()
    //     const image = getByAltText('imgAltText')
    //     expect(image).toHaveAttribute('src', 'string')

    // })
    test.each<[string, ProfileImage, string]>([
        ['renders "string" as image src', { $id: "string", $values: ["string"] }, 'string'],
        ['renders 325966_user_account_avatar_human_male_icon.svg as image src', { $id: "string" }, '325966_user_account_avatar_human_male_icon.svg']
    ])('%s', (description, imageSrc, svg) => {
        const { getByAltText } = render(<CurrentProfile passToggle={jest.fn()} imageSrc={imageSrc} imageName="imgAltText" />)
        // debug()
        const image = getByAltText('imgAltText')
        expect(image).toHaveAttribute('src', svg)
    })


});

