import axios, { AxiosError, AxiosResponse } from 'axios';
import AuthError from '../../components/auth/authError/authError';
import { User } from '../../models/user.model';
import { Response } from '../typings';

const AUTH_URL = 'https://localhost:44346/api/v1/auth/';

interface ServerError {
    errors: any;
    errorMessage: string;
}

export const login = async (email: string, password: string): Promise<User> => {
    try {
        const { data } = await axios.post<Response<User>>(AUTH_URL + 'login', {
            email: email,
            password: password
        });
        if (!(data?.$values?.length !== 0)) throw Error('no user found');
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
    localStorage.removeItem('user');
};

export const register = async (name: string, surname: string, mobile: string, email: string, password: string, role: string) => {
    return await axios.post<AxiosResponse>(AUTH_URL + 'signup', {
        name: name,
        surname: surname,
        phoneNumber: mobile,
        email: email,
        password: password,
        Roles: role
    });
};
