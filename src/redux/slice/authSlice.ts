import { User } from './../../models/user.model';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface AuthState {
    isLoggedIn: boolean;
    currentUser: User | null;
    currentToken: RefreshToken | null;
    error: string | null;
}

interface RefreshToken {
    token: string;
    refreshToken: string;
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
        isLoggedIn: false
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
                isLoggedIn: true,
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
        refreshToken: (state, { payload }: PayloadAction<RefreshToken>) => {
            return {
                ...state,
                token: payload.token,
                refreshToken: payload.refreshToken
            };
        }
    }
});

export const { registerSuccess, registerFail, loginSuccess, loginFail, userLogout, refreshToken } = authSlice.actions;

export const selectAuth = (state: RootState) => state.data.auth;

export default authSlice.reducer;
