import axios, { AxiosError, AxiosResponse } from 'axios';
import { AddCategory } from '../../redux/slice/productsSlice';
import api from '../api.services/instanceApi.service';
import RegisterError from '../handleServerError/RegisterError';
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

export const addNewCategory = async (categoriesDto: AddCategoryProps): Promise<AddCategory> => {
    try {
        const { data } = await api.post<AddCategory>(PRODUCTS_URL, { ...categoriesDto });

        if (!(Object.keys(data).length !== 0)) throw Error('no product found');
        return data;
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

export const updateCategory = (categories: CategoryUpdate): Promise<AxiosResponse<AddCategory, any>> => {
    try {
        return api.put(PRODUCTS_URL + 'update/', { ...categories });
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

export const deleteCategory = async (id: string): Promise<void> => {
    try {
        await api.delete<AxiosResponse>(PRODUCTS_URL + 'delete/' + id);
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
