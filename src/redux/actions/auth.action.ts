import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.hooks';
import { AppThunk, RootState } from '../store';

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
        refreshToken: (state, action: PayloadAction<string, string>) => {
            return {
                ...state,
                token: action.token,
                refreshToken: action.payload
            };
        }
    }
});
