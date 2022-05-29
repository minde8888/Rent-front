import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import { store } from '../../redux/store';

const api = axios.create({
    baseURL: 'https://localhost:44346/api/v1/'
});

api.interceptors.request.use(
    (config) => {
        // config.headers = authHeader();
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

const refreshAuthLogic = async (failedRequest: any) => {
    try {
        const response = await api.post('api/Auth/RefreshToken', {
            token: localStorage.getItem('token'),
            refreshToken: localStorage.getItem('refreshToken')
        });
        const { token, refreshToken } = response.data;
        // store.dispatch(setToken(token, refreshToken));
        localStorage.setItem('token', token); //to remove temp
        localStorage.setItem('refreshToken', refreshToken);
        return await Promise.resolve();
    } catch (err) {
        console.log('error', err);
        localStorage.clear();
        return await Promise.reject(err);
    }
};
createAuthRefreshInterceptor(api, refreshAuthLogic);
