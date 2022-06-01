import axios, { AxiosResponse } from 'axios';
import { User } from '../../models/user.model';
import { Response } from '../typings';

const AUTH_URL = 'https://localhost:44346/api/v1/auth/';

export const login = async (email: string, password: string): Promise<User> => {
    console.log(email, password);
    const { data } = await axios.post<Response<User>>(AUTH_URL + 'login', {
        email: email,
        password: password
    });
    if (!(data?.$values?.length !== 0)) throw Error('no user found');
    return data.$values[0];
};

export const logout = (): void => {
    localStorage.removeItem('user');
};

export const register = async (name: string, surname: string, mobile: string, email: string, password: string, role: string) => {
    console.log(role);
    return await axios.post<AxiosResponse>(AUTH_URL + 'signup', {
        name: name,
        surname: surname,
        phoneNumber: mobile,
        email: email,
        password: password,
        Roles: role
    });
};

export const getCurrentUser = (): null | string => {
    const userStr = localStorage.getItem('user');
    if (userStr) return JSON.parse(userStr);
    return null;
};
