import axios, { AxiosError } from 'axios';
import { Product } from '../../models/product.model';
import api from '../api.services/instanceApi.service';
import AuthError from '../handleServerError/AuthServerError';
import { IResponse, ServerError } from '../typings';
import { Products } from './typings';

const PRODUCTS_URL = 'products/';

export const addProduct = async (formData: FormData): Promise<Products> => {
    try {
        console.log(Object.fromEntries(formData));

        const { data } = await api.post<Products>(PRODUCTS_URL, formData);
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

export const getAllProducts = async (): Promise<IResponse<Product>> => {
    try {
        const { data } = await api.get<IResponse<Product>>(PRODUCTS_URL);
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

export const getProduct = async (id: string): Promise<IResponse<Product>> => {
    try {
        const { data } = await api.get<IResponse<Product>>(PRODUCTS_URL + 'id?id=' + id);
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
