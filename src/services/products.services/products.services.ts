import axios, { AxiosError, AxiosResponse } from 'axios';
import { Product } from '../../models/product.model';
import api from '../api.services/instanceApi.service';
import AuthError from '../handleServerError/AuthServerError';
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
        if (!(Object.keys(data).length !== 0)) throw Error('no products found');
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
        if (!(Object.keys(data).length !== 0)) throw Error('no product found');
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

export const updateProduct = (formData: FormData, id: string) => {
    console.log(Object.fromEntries(formData), id);
    try {
        return api.put<AxiosResponse>(PRODUCTS_URL + 'id?id=' + id, formData);
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
