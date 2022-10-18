import { fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithContext } from '../../../../helpers/renderWithContext.helper';
import { ImageFiles } from '../../typings';
import UploadImages from './uploadImages.component';

describe('<UploadImages />', () => {
    const setup = async () => {
        const utils = renderWithContext(<UploadImages imageSrc={[{ data_url: 'test_img' }]} getImages={function (files: ImageFiles[] | undefined): void {}} />);
        return {
            ...utils
        };
    };

    test('renders images', async () => {
        const { getByAltText } = await setup();
        const image = getByAltText('alt-text');
        expect(image).toBeVisible();
    });
    test('upload file', async () => {
        const files = [
            new File(['test_1'], 'test_1.jpg', { type: 'image/jpg' }),
            new File(['test_2'], 'test_2.jpeg', { type: 'image/jpeg' }),
            new File(['test_3'], 'test_3.png', { type: 'image/png' }),
            new File(['test_4'], 'test_4.gif', { type: 'image/gif' }),
            new File(['test_5'], 'test_5.pdf', { type: 'image/pdf' })
        ];
        const { getByTestId, debug } = await setup();
        const fileInput = getByTestId('upload-test-id') as HTMLInputElement;

        fireEvent.change(fileInput, {
            target: { files }
        });

        expect(fileInput.files).toHaveLength(5);
        if (fileInput.files !== null) {
            expect(fileInput.files[0].name).toBe('test_1.jpg');
            expect(fileInput.files[1].name).toBe('test_2.jpeg');
            expect(fileInput.files[2].name).toBe('test_3.png');
            expect(fileInput.files[3].name).toBe('test_4.gif');
            expect(fileInput.files[5]).toBe(undefined);
        }
    });
});
