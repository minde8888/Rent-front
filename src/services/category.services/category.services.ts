import axios, { AxiosError, AxiosResponse } from 'axios';
import api from '../api.services/instanceApi.service';
import RegisterError from '../handleServerError/RegisterError';
import { ServerError } from '../typings';

const PRODUCTS_URL = 'category/';

interface AddCategory {
    categoriesName?: string;
    description?: string;
    imageName?: string;
    productsId: string;
}

export const addNewCategory = async (categoriesDto: AddCategory) => {
    try {
        return await api.post<AxiosResponse>(PRODUCTS_URL, { ...categoriesDto });
    } catch (error) {
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

export const deleteCategory = async (id: string) => {
    try {
        return await api.delete<AxiosResponse>(PRODUCTS_URL + 'delete/' + id);
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            const serverError = error as AxiosError<ServerError>;
            if (serverError && serverError.response?.data) {
                throw new RegisterError(serverError.response.data.errors.$values[0]);
            }
            throw new RegisterError(error.message);
        }
        throw error;
    }
};
