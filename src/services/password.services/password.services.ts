import axios, { AxiosError, AxiosResponse } from 'axios';
import api from '../api.services/instanceApi.service';
import RegisterError from '../handleServerError/RegisterError';
import { ServerError } from '../typings';

const AUTH_URL = 'auth/';

export const sendPasswordToEmail = async (email: string) => {
    try {
        await api.post<AxiosResponse>(AUTH_URL + 'forgot-password', {
            email: email
        });
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            const serverError = error as AxiosError<ServerError>;
            if (serverError && serverError.response) {
                throw new RegisterError(serverError.response.data.message);
            }
            throw new RegisterError(error.message);
        }
        throw error;
    }
};
