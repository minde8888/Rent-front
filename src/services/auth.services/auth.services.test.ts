import api from '../api.services/instanceApi.service';
import { login } from './auth.services';

jest.mock('../api.services/instanceApi.service');

describe('auth service', () => {
    test('throws error because API fails', async () => {
        (api.post as jest.Mock).mockRejectedValue(new Error('error'));

        try {
            await login('email@email.com', 'veryStrongPassword');
        } catch (error) {
            expect((<Error>error).message).toBe('error');
        } finally {
            expect.assertions(1);
        }
    });

    test('return user from api mock', async () => {
        // { data: mockUser }
        const mockUser = { id: 123, name: 'Tester' };
        (api.post as jest.Mock).mockResolvedValue({ data: mockUser });

        const result = await login('email@email.com', 'veryStrongPassword');

        expect(result).toEqual(mockUser);
    });
});
