import { User } from './../../models/user.model';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface AuthState {
    isLoggedIn: boolean;
    user: User | null;
    error: string | null;
}

export interface RefreshToken {
    token: string;
    refreshToken: string;
}

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false
    } as AuthState,
    reducers: {
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
                isLoggedIn: true,
                user: action.payload
            };
        },
        loginFail: (state, action: PayloadAction<string>) => {
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
        changeRefreshToken: (state, { payload }: PayloadAction<RefreshToken>) => {
            return {
                ...state,
                token: payload.token,
                refreshToken: payload.refreshToken
            };
        }
    }
});

export const { loginSuccess, loginFail, userLogout, changeRefreshToken, registerFail } = authSlice.actions;

export const selectAuth = (state: RootState) => state.data.auth;

export default authSlice.reducer;
