import axios, { AxiosError } from 'axios';
import { loginFail } from '../../redux/slice/authSlice';
import { store } from '../../redux/store';
import AuthError from '../auth/authError/authError';

interface Error {
    errors: any;
}

const handleServerError = (error: Error) => {
    if (error instanceof AuthError) {
        return store.dispatch(loginFail(error.message));
    }
    store.dispatch(loginFail('An unexpected error occurred'));
    throw error;
};

export default handleServerError;
