import { User } from './../../models/user.model';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { refreshTokenType } from '../models/auth.model';
import { RootState } from '../store';

interface AuthState {
    isLoggedIn: boolean;
    currentUser: User | null;
    token: string;
    refreshToken: string;
    error: string | null;
}

// class AuthError extends Error {
//     constructor(message: string) {
//         super(message);
//     }
// }
// instanceof AuthError

// if (err instanceof AuthError)

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false,
        token: '',
        refreshToken: ''
    } as AuthState,
    reducers: {
        registerSuccess: (state) => {
            return {
                ...state,
                isLoggedIn: false
            };
        },
        registerFail: (state, action: PayloadAction<string>) => {
            return {
                ...state,
                isLoggedIn: false,
                error: action.payload
            };
        },
        loginSuccess: (state, action: PayloadAction<User>) => {
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

export const selectAuth = (state: RootState) => state.reducer.auth;

export default authSlice.reducer;
