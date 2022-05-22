import { $CombinedState, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../reducers';
import { AppThunk } from '../store';

export const login = (): AppThunk => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        const currentUser = getCurrentUserFromAPI('https://auth-end-point.com/login');
        dispatch(setAuthSuccess(currentUser));
    } catch (error) {
        dispatch(setAuthFailed(error));
    } finally {
        dispatch(setLoading(false));
    }
};

export const logOut = (): AppThunk => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        await endUserSession('https://auth-end-point.com/log-out');
    } catch (error) {
        dispatch(setAuthFailed(error));
    } finally {
        dispatch(setLoading(false));
    }
};

export const authSelector = (state: RootState) => state[$CombinedState];
export default authSlice.reducer;

function setLoading(arg0: boolean): any {
    throw new Error('Function not implemented.');
}

function getCurrentUserFromAPI(arg0: string) {
    throw new Error('Function not implemented.');
}

function setAuthSuccess(currentUser: void): any {
    throw new Error('Function not implemented.');
}

function setAuthFailed(error: unknown): any {
    throw new Error('Function not implemented.');
}

function endUserSession(arg0: string) {
    throw new Error('Function not implemented.');
}
