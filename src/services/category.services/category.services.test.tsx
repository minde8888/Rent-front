import api from '../api.services/instanceApi.service';
import { addNewCategory, deleteCategory, updateCategory } from './category.services';

jest.mock('../api.services/instanceApi.service');

describe('category service', () => {
    xtest('add new category', async () => {
        const mockCategory = [{
            $id: '',
            categoriesId: '',
            categoriesName: 'test_1',
            description: '',
            imageName: '',
            productsId: '123'
        }];
        const categoriesDto = {
            categoriesName: 'test_1',
            description: '',
            imageName: '',
            productsId: '123'
        };


        (api.post as jest.Mock).mockResolvedValue({ mockCategory, ...response });
        const result = await addNewCategory(categoriesDto);
        // console.log(mockCategory);
        console.log(result);

        // expect(result).toEqual(mockCategory);
    });

    test('update category', async () => {
        const categoriesDto = {
            categoriesName: 'test_1',
            description: '',
            imageName: '',
            productsId: '123',
            categoriesUpdateId: '12345'
        };
        (api.put as jest.Mock).mockResolvedValueOnce({ categoriesDto, ...response });
        const result = await updateCategory(categoriesDto);
        expect(result).toEqual({ categoriesDto, ...response });

    });

    test('delete category', async () => {
        api.delete = jest.fn().mockResolvedValueOnce(true)
        await deleteCategory('123');
        expect(api.delete).toHaveBeenCalledTimes(1)

    });
});

const response = {
    status: 200,
    statusText: 'Ok',
    headers: {},
    config: {}
}