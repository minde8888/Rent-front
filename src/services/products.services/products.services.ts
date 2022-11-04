import axios, { AxiosError, AxiosResponse } from 'axios';
import { Product, ResponseProducts } from '../../models/product.model';
import api from '../api.services/instanceApi.service';
import ProductError from '../handleServerError/ProductError';
import { IResponse, ServerError } from '../typings';

const PRODUCTS_URL = 'products/';

export const addProduct = async (formData: FormData) => {
    try {
        // console.log(Object.fromEntries(formData));
        return await api.post('products', formData);
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            const serverError = error as AxiosError<ServerError>;
            if (serverError && serverError.response?.data) {
                throw new ProductError(serverError.response.data.errors.$values[0]);
            }
            throw new ProductError(error.message);
        }
        throw error;
    }
};

export const getAllProducts = async (): Promise<ResponseProducts> => {
    try {
        const { data } = await api.get<ResponseProducts>(PRODUCTS_URL);
        if (!(Object.keys(data).length !== 0)) throw Error('no products found');
        return data;
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            const serverError = error as AxiosError<ServerError>;
            if (serverError && serverError.response?.data) {
                throw new ProductError(serverError.response.data.errors.$values[0]);
            }
            throw new ProductError(error.message);
        }
        throw error;
    }
};

export const updateProduct = async (formData: FormData): Promise<Product> => {
    // console.log(Object.fromEntries(formData));
    try {
        const { data } = await api.put<Product>(PRODUCTS_URL + 'update', formData);
        if (!(Object.keys(data).length !== 0)) throw Error('no product found');
        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const serverError = error as AxiosError<ServerError>;
            if (serverError && serverError.response) {
                throw new ProductError(serverError.response.data.errors.$values[0]);
            }
            throw new ProductError(error.message);
        }
        throw error;
    }
};

export const removeProduct = async (id: string) => {
    try {
        return await api.delete<AxiosResponse>(PRODUCTS_URL + 'delete/' + id);
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            const serverError = error as AxiosError<ServerError>;
            if (serverError && serverError.response?.data) {
                throw new ProductError(serverError.response.data.errors.$values[0]);
            }
            throw new ProductError(error.message);
        }
        throw error;
    }
};

export const paginationProduct = async (PageNumber: number) => {
    try {
        const { data } = await api.get<ResponseProducts>(`Products?PageNumber=${PageNumber}&PageSize=${10}`);
        if (!(Object.keys(data).length !== 0)) throw Error('no products found');
        return data;
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            const serverError = error as AxiosError<ServerError>;
            if (serverError && serverError.response?.data) {
                throw new ProductError(serverError.response.data.errors.$values[0]);
            }
            throw new ProductError(error.message);
        }
        throw error;
    }
};
