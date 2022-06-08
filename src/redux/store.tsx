import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import logger from 'redux-logger';
import { User } from '../models/user.model';
import rootReducer from './reducers';

type ImmutableCheck = { warnAfter: number };
type GetDefaultMiddlewareFn = (arg0: { immutableCheck: ImmutableCheck }) => any;

interface Action {
    type: string;
    payload: User;
}

const localStorageMiddleware = ({ getState }: any) => {
    return (next: (arg0: any) => any) => (action: Action) => {
        const result = next(action);
        localStorage.setItem('user', JSON.stringify(getState()));
        return result;
    };
};

const reHydrateStore = () => {
    if (localStorage.getItem('user') !== null) {
        return JSON.parse(localStorage.getItem('user') || 'null');
    }
};

export const store = configureStore({
    reducer: {
        data: rootReducer
    },
    preloadedState: reHydrateStore(),
    middleware: (getDefaultMiddleware: GetDefaultMiddlewareFn) => [
        ...getDefaultMiddleware({
            immutableCheck: { warnAfter: 200 }
        }).concat(localStorageMiddleware),
        logger
    ]
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch();
