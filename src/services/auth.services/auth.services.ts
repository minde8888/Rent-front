import axios from 'axios';
const AUTH_URL = 'https://localhost:44395/api/auth/';

class AuthService {
    async login(username: string, password: string) {
        const response = await axios.post(AUTH_URL + 'login', {
            username,
            password
        });
        if (response.data.accessToken) {
            localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
    }

    logout(): void {
        localStorage.removeItem('user');
    }

    register(username: string, email: string, password: string) {
        return axios.post(AUTH_URL + 'signup', {
            username,
            email,
            password
        });
    }

    getCurrentUser(): null | string {
        const userStr = localStorage.getItem('user');
        if (userStr) return JSON.parse(userStr);
        return null;
    }
}
export default new AuthService();
