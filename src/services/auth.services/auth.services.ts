import axios, { AxiosResponse } from 'axios';
import { loginFailValue, loginSuccessValue } from '../../redux/action/auth.actions';
const AUTH_URL = 'https://localhost:44346/api/v1/auth/';

export const login = (username: string, password: string) => {
    console.log(username, password);

    axios
        .post(AUTH_URL + 'login', {
            username,
            password
        })
        .then((response) => {
            console.log(response);
            return response.data;
            // if (response.data.accessToken) {
            //     localStorage.setItem('user', JSON.stringify(response.data));
            // }
        })
        .catch((error) => {
            console.log(error.message);
            return error.message;
        });
    return [];
};

export const logout = (): void => {
    localStorage.removeItem('user');
};

export const register = async (username: string, email: string, password: string) => {
    return axios.post(AUTH_URL + 'signup', {
        username,
        email,
        password
    });
};

export const getCurrentUser = (): null | string => {
    const userStr = localStorage.getItem('user');
    if (userStr) return JSON.parse(userStr);
    return null;
};
