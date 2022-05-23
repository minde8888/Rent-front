import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.hooks';
import { AppThunk, RootState } from '../store';

type refreshToken = { token: string; refreshToken: string };

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
        loginSuccess: (state, action: PayloadAction<string>) => {
            return {
                ...state,
                isLoggedIn: false,
                error: action.payload
            };
        },
        loginFail: (state) => {
            return {
                ...state,
                isLoggedIn: false
            };
        },
        userLogout: (state) => {
            return {
                ...state,
                isLoggedIn: false
            };
        },
        refreshToken: (state, { payload }: PayloadAction<refreshToken>) => {
            return {
                ...state,
                token: payload.token,
                refreshToken: payload.refreshToken
            };
        }
    }
});
