import axios, { AxiosError, AxiosResponse } from 'axios';
import { Product, ResponseProducts } from '../../models/product.model';
import api from '../api.services/instanceApi.service';
import ProductError from '../handleServerError/AuthServerError';
import RegisterError from '../handleServerError/RegisterError';
import { IResponse, ServerError } from '../typings';
import { Products } from './typings';

const PRODUCTS_URL = 'products/';

export const addProduct = async (formData: FormData): Promise<Products> => {
    try {
        // console.log(Object.fromEntries(formData));
        const { data } = await api.post<Products>(PRODUCTS_URL, formData);
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

export const getProduct = async (id: string): Promise<IResponse<Product>> => {
    try {
        const { data } = await api.get<IResponse<Product>>(PRODUCTS_URL + 'id?id=' + id);

        if (!(Object.keys(data).length !== 0)) throw Error('no product found');
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

export const updateProduct = (formData: FormData) => {
    console.log(Object.fromEntries(formData));

    try {
        return api.put<AxiosResponse>(PRODUCTS_URL + 'update', formData);
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
