import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import logger from 'redux-logger';
import rootReducer from './reducers';

type ImmutableCheck = { warnAfter: number };
type GetDefaultMiddlewareFn = (arg0: { immutableCheck: ImmutableCheck }) => any;

export const store = configureStore({
    reducer: {
        data: rootReducer
    },
    middleware: (getDefaultMiddleware: GetDefaultMiddlewareFn) => [
        ...getDefaultMiddleware({
            immutableCheck: { warnAfter: 200 }
        }),
        logger
    ]
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch();
