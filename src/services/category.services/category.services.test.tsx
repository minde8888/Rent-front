import api from '../api.services/instanceApi.service';
import { addNewCategory } from './category.services';

jest.mock('../api.services/instanceApi.service');

describe('category service', () => {
    xtest('add new category', async () => {
        const mockCategory = {
            $id: '',
            categoriesId: '',
            categoriesName: 'test_1',
            description: '',
            imageName: '',
            productsId: '123'
        };
        const categoriesDto = {
            categoriesName: 'test_1',
            description: '',
            imageName: '',
            productsId: '123'
        };
        (api.post as jest.Mock).mockRejectedValue({
            data: {
                $id: '',
                categoriesId: '',
                categoriesName: 'test_1',
                description: '',
                imageName: '',
                productsId: '123'
            }
        });
        const result = await addNewCategory(categoriesDto);
        // console.log(mockCategory);
        // console.log(result);

        // expect(result).toEqual(mockCategory);
    });
});
