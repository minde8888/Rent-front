import axios, { AxiosError } from 'axios';
import { User } from '../../models/user.model';
import api from '../api.services/instanceApi.service';
import AuthError from '../handleServerError/AuthServerError';
import { ServerError, Response } from '../typings';

const SELLER_URL = 'Seller/';

export const getProfile = async (id: string): Promise<User> => {
    try {
        const { data } = await api.get<Response<User>>(SELLER_URL + 'id?id=' + id);
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
