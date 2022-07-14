import { User } from './../../models/user.model';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

const userSlice = createSlice({
    name: 'user',
    initialState: {} as User,
    reducers: {
        getUserProfile: (state, action: PayloadAction<User>) => {
            return {
                ...state,
                ...action.payload
            };
        },
        updateProfile: (state, action: PayloadAction<User>) => {
            return {
                ...state,
                ...action.payload
            };
        }
    }
});

export const { updateProfile, getUserProfile } = userSlice.actions;

export default userSlice.reducer;
