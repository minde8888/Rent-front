import axios, { AxiosError } from 'axios';
import api from '../api.services/instanceApi.service';
import AuthError from '../handleServerError/AuthServerError';
import { ServerError } from '../typings';
import { Products } from './typings';

export const addProduct = async (formData: FormData): Promise<Products> => {
    try {
        console.log(Object.fromEntries(formData));

        const { data } = await api.post<Products>('products', formData);
        return data;
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
