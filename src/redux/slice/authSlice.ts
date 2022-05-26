import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { refreshTokenType } from '../models/auth.model';

export interface AuthError {
    message: string;
}

export interface AuthState {
    isAuth: boolean;
    currentUser?: CurrentUser;
    isLoading: boolean;
    error: AuthError;
}

export interface CurrentUser {
    id: string;
    display_name: string;
    email: string;
    photo_url: string;
}
export const initialState: AuthState = {
    isAuth: false,
    isLoading: false,
    error: { message: 'An Error occurred' }
};

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false,
        error: '',
        token: '',
        refreshToken: ''
    },
    reducers: {
        registerSuccess: (state) => {
            return {
                ...state,
                isLoggedIn: false
            };
        },
        registerFail: (state) => {
            return {
                ...state,
                isLoggedIn: false
            };
        },
        loginSuccess: (state, action: PayloadAction<Promise<[]> | []>) => {
            return {
                ...state,
                isLoggedIn: false,
                user: action.payload
            };
        },
        loginFail: (state, action: PayloadAction<string>) => {
            console.log(action);

            return {
                ...state,
                isLoggedIn: false,
                error: action.payload
            };
        },
        userLogout: (state) => {
            return {
                ...state,
                isLoggedIn: false
            };
        },
        refreshToken: (state, { payload }: PayloadAction<refreshTokenType>) => {
            return {
                ...state,
                token: payload.token,
                refreshToken: payload.refreshToken
            };
        }
    }
});

export const { registerSuccess, registerFail, loginSuccess, loginFail, userLogout, refreshToken } = authSlice.actions;

export default authSlice.reducer;
