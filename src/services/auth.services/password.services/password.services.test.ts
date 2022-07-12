import api from '../../api.services/instanceApi.service';
import { sendPasswordToEmail } from './password.services';

jest.mock('../../api.services/instanceApi.service');

describe('restore password service', () => {
    test('throws error because  API fails', async () => {
        (api.post as jest.Mock).mockRejectedValue(new Error('error'));
        try {
            await sendPasswordToEmail('email@email.com');
        } catch (error) {
            expect((<Error>error).message).toBe('error');
        } finally {
            expect.assertions(1);
        }
    });

    test('return from API mock', async () => {
        const mockUser = { email: 'email@email.com' };
        (api.post as jest.Mock).mockResolvedValue(mockUser);
        await sendPasswordToEmail('email@email.com');
        expect(api.post).toHaveBeenCalled();
    });
});
