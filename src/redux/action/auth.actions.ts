import { AppThunk } from '../store';
import { registerSuccess, registerFail, loginSuccess, loginFail, userLogout, refreshToken } from '../slice/authSlice';
import { refreshTokenType } from '../models/auth.model';

export const registerSuccessValue = (): AppThunk => async (dispatch) => {
    dispatch(registerSuccess());
};

export const registerFailValue = (): AppThunk => async (dispatch) => {
    dispatch(registerFail());
};

export const loginSuccessValue =
    (value: []): AppThunk =>
    async (dispatch) => {
        dispatch(loginSuccess(value));
    };

export const loginFailValue =
    (value: string): AppThunk =>
    async (dispatch) => {
        dispatch(loginFail(value));
    };

export const userLogoutValue = (): AppThunk => async (dispatch) => {
    dispatch(userLogout());
};

export const refreshTokenValue =
    (value: refreshTokenType): AppThunk =>
    async (dispatch) => {
        dispatch(refreshToken(value));
    };
