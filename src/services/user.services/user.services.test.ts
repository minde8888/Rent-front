import api from '../api.services/instanceApi.service';
import { getProfile, updateUser } from './user.services';

jest.mock('../api.services/instanceApi.service');

describe('auth service', () => {
    test('throws error because user profile API fails', async () => {
        (api.get as jest.Mock).mockRejectedValue(new Error('error'));
        try {
            await getProfile('1234');
        } catch (error) {
            expect((<Error>error).message).toBe('error');
        } finally {
            expect.assertions(1);
        }
    });

    test('return user profile from API mock', async () => {
        const mockUser = { id: 1234 };
        (api.get as jest.Mock).mockResolvedValue({ data: mockUser });
        const result = await getProfile('1234');
        expect(result).toEqual(mockUser);
    });

    test('throws error because update user profile API fails', async () => {
        (api.put as jest.Mock).mockRejectedValue(new Error('error'));
        const formData = new FormData();
        try {
            await updateUser(formData);
        } catch (error) {
            expect((<Error>error).message).toBe('error');
        } finally {
            expect.assertions(1);
        }
    });

    test('return update user profile from API mock', async () => {
        const formData = new FormData();
        const mockUser = { formData: formData, id: 1234 };
        (api.put as jest.Mock).mockResolvedValue({ data: mockUser });
        const result = await updateUser(formData);
        expect(result).toEqual(mockUser);
    });
});
