import { useState, useCallback } from 'react';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import { login } from '../../../services/auth.services/auth.services';
import { useAppDispatch } from '../../../hooks/redux.hooks';
import { loginFail, loginSuccess } from '../../../redux/slice/authSlice';
import { TextField } from '../../validation/textField';
import { Navigate, NavLink } from 'react-router-dom';
import { useAppSelector } from '../../../hooks/redux.hooks';
import style from '../auth.module.scss';
import { getUserProfile } from '../../../redux/slice/userSlice';

interface FormValues {
    email: string;
    password: string;
}

export const InnerForm = (props: { onSubmit: (values: FormValues) => Promise<void>; message: string }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { isLoggedIn, error } = useAppSelector((state) => state.data.auth);
    /* eslint-disable */
    const handleSubmit = useCallback(
        async (values: FormValues) => {
            setIsSubmitting(true);
            await props.onSubmit(values);
            setIsSubmitting(false);
        },
        [props.onSubmit]
    );
    /* eslint-disable */
    if (isLoggedIn) {
        return <Navigate to="/" />;
    }

    return (
        <Formik
            initialValues={{
                email: '',
                password: ''
            }}
            onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({
                email: Yup.string().email('Email not valid').required('Email is required'),
                password: Yup.string()
                    .min(6, 'Password must be at least 6 charters')
                    .required('Password is required')
                    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%&])(?=.{8,})/, 'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character')
            })}
        >
            <Form>
                <h1>{props.message}</h1>
                <p>This can be your application</p>
                <TextField label="Email" name="email" type="email" />
                <TextField label="Password" name="password" type="password" />
                <button type="submit" disabled={isSubmitting}>
                    Login
                </button>
                {error && (
                    <div className="error-group">
                        <div className="danger">{error}</div>
                    </div>
                )}
                <div className={style.links}>
                    Not a user ?
                    <NavLink to={'/signup'} className="nav-link">
                        Sign Up
                    </NavLink>
                </div>
                <div className={style.links}>
                    <NavLink to={'/forgot-password'} className="nav-link">
                        Forgot Password ?
                    </NavLink>
                </div>
            </Form>
        </Formik>
    );
};

const Login = () => {
    const dispatch = useAppDispatch();
    const handleSubmit = async (values: FormValues) => {
        try {
            const user = await login(values.email, values.password);
            if (!(user instanceof Error)) {
                dispatch(getUserProfile(user));
                if (typeof user.token === 'string' && typeof user.refreshToken === 'string') {
                    dispatch(loginSuccess({ token: user.token, refreshToken: user.refreshToken }));
                }
            }
        } catch (error: any) {
            dispatch(loginFail(error.message));
        }
    };

    return (
        <div className={style.container}>
            <div className={style.auth}>
                <InnerForm message="Login" onSubmit={handleSubmit} />
            </div>
        </div>
    );
};

export default Login;
