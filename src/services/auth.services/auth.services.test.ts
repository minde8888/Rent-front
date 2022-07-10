import api from '../api.services/instanceApi.service';
import { login, register } from './auth.services';

jest.mock('../api.services/instanceApi.service');

describe('auth service', () => {
    test('throws error because Login API fails', async () => {
        (api.post as jest.Mock).mockRejectedValue(new Error('error'));
        try {
            await login('email@email.com', 'veryStrongPassword');
        } catch (error) {
            expect((<Error>error).message).toBe('error');
        } finally {
            expect.assertions(1);
        }
    });

    test('return user from API mock', async () => {
        const mockUser = { id: 123, name: 'Tester' };
        (api.post as jest.Mock).mockResolvedValue({ data: mockUser });
        const result = await login('email@email.com', 'veryStrongPassword');
        expect(result).toEqual(mockUser);
    });

    test('throws error because Signup API fails', async () => {
        (api.post as jest.Mock).mockRejectedValue(new Error('error'));
        try {
            await register('name', 'surname', 'mobile', 'email', 'password', 'string');
        } catch (error) {
            expect((<Error>error).message).toBe('error');
        } finally {
            expect.assertions(1);
        }
    });

    test('return signup from API mock', async () => {
        const mockUser = { name: 'string', surname: 'string', mobile: 'string', email: 'string', password: 'string', role: 'string' };
        (api.post as jest.Mock).mockResolvedValue({ mockUser });
        const result = await register('name', 'surname', 'mobile', 'email', 'password', 'role');
        expect(result).toEqual({ mockUser: mockUser });
    });
});
