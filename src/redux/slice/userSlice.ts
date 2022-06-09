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

const userSlice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false
    } as AuthState,
    reducers: {
        updateProfile: (state, action: PayloadAction<User>) => {
            return {
                ...state,
                isLoggedIn: true,
                user: action.payload
            };
        }
    }
});

export const { updateProfile } = userSlice.actions;

export const selectAuth = (state: RootState) => state.data.auth;

export default userSlice.reducer;
