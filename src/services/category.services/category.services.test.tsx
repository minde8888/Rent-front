import api from '../api.services/instanceApi.service';
import { addNewCategory, deleteCategory, getAllCategories, updateCategory } from './category.services';

jest.mock('../api.services/instanceApi.service');

describe('category service', () => {
    test('add new category', async () => {
        const categoriesDto = {
            categoriesName: 'test_1',
            description: '',
            imageName: '',
            productsId: '123'
        };
        (api.post as jest.Mock).mockResolvedValue({ data: categoriesDto });
        const result = await addNewCategory(categoriesDto);
        expect(result).toEqual(categoriesDto);
    });

    test('return all products from API mock', async () => {
        const mockProduct = { ...response };
        (api.get as jest.Mock).mockResolvedValue({ data: response });
        const result = await getAllCategories();
        expect(result).toEqual(mockProduct);
    });

    test('throws error because update category API fails', async () => {
        (api.delete as jest.Mock).mockRejectedValueOnce(new Error('error'));
        try {
            await deleteCategory('123');
        } catch (error) {
            expect((error as Error).message).toBe('error');
        } finally {
            expect.assertions(1);
        }
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

    test('throws error because delete category API fails', async () => {
        api.delete = jest.fn().mockRejectedValue(new Error('error'));
        try {
            await deleteCategory('123');
        } catch (error) {
            expect((error as Error).message).toBe('error');
        } finally {
            expect.assertions(1);
        }
    });

    test('delete category', async () => {
        api.delete = jest.fn().mockResolvedValueOnce(true);
        await deleteCategory('123');
        expect(api.delete).toHaveBeenCalledTimes(1);
    });
});

const response = {
    status: 200,
    statusText: 'Ok',
    headers: {},
    config: {}
};
