import axios, { AxiosError, AxiosResponse } from 'axios';
import { Categories } from '../../models/categories.model';
import api from '../api.services/instanceApi.service';
import ProductError from '../handleServerError/ProductError';
import { ServerError } from '../typings';

const PRODUCTS_URL = 'category/';

interface AddCategoryProps {
    categoriesName?: string;
    description?: string;
    imageName?: string;
    productsId?: string;
}

interface CategoryUpdate extends AddCategoryProps {
    categoriesUpdateId: string;
}

export const addNewCategory = async (categoriesDto: AddCategoryProps): Promise<Categories> => {
    try {
        const { data } = await api.post<Categories>(PRODUCTS_URL, { ...categoriesDto });
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

export const getAllCategories = async (): Promise<Categories> => {
    try {
        const { data } = await api.get<Categories>(PRODUCTS_URL);
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

export const updateCategory = (categories: CategoryUpdate): Promise<AxiosResponse<Categories, any>> => {
    try {
        return api.put(PRODUCTS_URL + 'update/', { ...categories });
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

export const deleteCategory = async (id: string): Promise<void> => {
    try {
        await api.delete<AxiosResponse>(PRODUCTS_URL + 'delete/' + id);
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
