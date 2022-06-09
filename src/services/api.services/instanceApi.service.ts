import axios, { AxiosRequestConfig } from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import { User } from '../../models/user.model';
import { changeRefreshToken } from '../../redux/slice/authSlice';
import { store } from '../../redux/store';
import authHeader from '../auth.services/authHeader.services';

export interface Response {
    $id: string;
    token: string;
    refreshToken: string;
}

const api = axios.create({
    baseURL: 'https://localhost:44346/api/v1/'
});

api.interceptors.request.use(
    (config: AxiosRequestConfig): AxiosRequestConfig => {
        if (!config) throw new Error(`Expected 'config' not to be undefined`);
        if (!config?.headers) throw new Error(`Expected 'config.headers' not to be undefined`);
        console.log(config.headers);
        const newHeader = { ...config.headers, ...authHeader() };
        config.headers = newHeader;
        console.log(config.headers);

        return config;
    },
    (error) => {
        throw new Error('Heder error' + error);
    }
);

const refreshAuthLogic = async (failedRequest: any): Promise<void> => {
    try {
        const user: User = JSON.parse(localStorage.getItem('user') || 'false');

        const response = await api.post<Response>('RefreshToken/', {
            token: user.token,
            refreshToken: user.refreshToken
        });

        const { token, refreshToken } = response.data;
        if (!(token.length !== 0 || refreshToken.length !== 0)) throw Error('no token found');

        user.refreshToken = refreshToken;
        user.token = token;
        const payload = { token, refreshToken };
        store.dispatch(changeRefreshToken(payload));
        localStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
        localStorage.clear();
        throw error;
    }
};

createAuthRefreshInterceptor(api, refreshAuthLogic);

export default api;
