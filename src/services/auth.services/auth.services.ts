import axios, { AxiosError, AxiosResponse } from 'axios';
import AuthError from '../handleServerError/AuthServerError';
import { User } from '../../models/user.model';
import { Response, ServerError } from '../typings';
import RegisterError from '../handleServerError/RegisterError';
import api from '../api.services/instanceApi.service';

const AUTH_URL = 'auth/';

export const login = async (email: string, password: string): Promise<User> => {
    try {
        const { data } = await api.post<Response<User>>(AUTH_URL + 'login', {
            email: email,
            password: password
        });
        if (!(data.$values.length !== 0)) throw Error('no user found');
        return data.$values[0];
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            const serverError = error as AxiosError<ServerError>;
            if (serverError && serverError.response?.data) {
                throw new AuthError(serverError.response.data.errors.$values[0]);
            }
            throw new AuthError(error.message);
        }
        throw error;
    }
};

export const logout = (): void => {
    localStorage.clear();
};

export const register = async (name: string, surname: string, mobile: string, email: string, password: string, role: string) => {
    try {
        return await api.post<AxiosResponse>(AUTH_URL + 'signup', {
            name: name,
            surname: surname,
            phoneNumber: mobile,
            email: email,
            password: password,
            Roles: role
        });
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            const serverError = error as AxiosError<ServerError>;
            if (serverError && serverError.response) {
                throw new RegisterError(serverError.response.data.errors.$values[0]);
            }
            throw new RegisterError(error.message);
        }
        throw error;
    }
};
