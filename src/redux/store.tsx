import { configureStore, Action } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { ThunkAction } from 'redux-thunk'
import logger from 'redux-logger';
import rootReducer from "./reducers";

export const store = configureStore({
    reducer: {
        reducer: rootReducer
    },
    middleware: (getDefaultMiddleware: (arg0: { immutableCheck: { warnAfter: number; }; }) => any) => [
        ...getDefaultMiddleware({
            immutableCheck: { warnAfter: 200 }
        }),
        logger
    ]
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch()
export type AppThunk = ThunkAction<void, RootState, unknown, Action>

