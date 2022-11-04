import { product, response } from "../../components/products/variables/variables";
import api from "../api.services/instanceApi.service";
import { addProduct, getAllProducts } from "./products.services";

jest.mock('../api.services/instanceApi.service');

describe('auth service', () => {
    const formData = new FormData();

    test('throws error because add product API fails', async () => {
        (api.post as jest.Mock).mockRejectedValue(new Error('error'));
        try {
            await addProduct(formData);
        } catch (error) {
            expect((error as Error).message).toBe('error');
        } finally {
            expect.assertions(1);
        }
    });

    test('return added product from API mock', async () => {
        const mockProduct = { formData: formData };
        (api.post as jest.Mock).mockResolvedValue({ data: mockProduct });
        const result = await addProduct(formData);
        expect(result.data.formData).toEqual(mockProduct.formData);
    });
    test('throws error because get all products API fails', async () => {
        (api.get as jest.Mock).mockRejectedValue(new Error('error'));
        try {
            await getAllProducts();
        } catch (error) {
            expect((error as Error).message).toBe('error');
        } finally {
            expect.assertions(1);
        }
    });

    test('return all products from API mock', async () => {
        const mockProduct = { ...response };
        (api.get as jest.Mock).mockResolvedValue({ data: response });
        const result = await getAllProducts();
        expect(result).toEqual(mockProduct);
    });
});