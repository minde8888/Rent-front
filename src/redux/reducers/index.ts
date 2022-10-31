import { combineReducers } from 'redux';
import authSlice from '../slice/authSlice';
import categoriesSlice from '../slice/categoriesSlice';
import productsSlice from '../slice/productsSlice';
import userSlice from '../slice/userSlice';

const rootReducer = combineReducers({
    auth: authSlice,
    user: userSlice,
    products: productsSlice,
    categories: categoriesSlice
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;

export const selectAuth = (state: RootState) => state.auth;
export const selectUser = (state: RootState) => state.user;
