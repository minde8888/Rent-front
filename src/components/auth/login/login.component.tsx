import { Dispatch } from 'react';
import * as Yup from 'yup';
import { withFormik, FormikProps, Form } from 'formik';
import { login } from '../../../services/auth.services/auth.services';
import { useAppDispatch } from '../../../hooks/redux.hooks';
import { AnyAction } from 'redux';
import { loginFail, loginSuccess } from '../../../redux/slice/authSlice';
import { TextField } from '../validation/textField';
import { Navigate, NavLink } from 'react-router-dom';
import { useAppSelector } from '../../../hooks/redux.hooks';
import style from '../auth.module.scss';

interface FormValues {
    email: string;
    password: string;
}

interface OtherProps {
    message: string;
}

interface MyFormProps {
    initEmail?: string;
    message: string;
    dispatch: Dispatch<AnyAction>;
}

const InnerForm = (props: OtherProps & FormikProps<FormValues>) => {
    const { isSubmitting, message } = props;
    const { email } = props.values;
    const { isLoggedIn, error } = useAppSelector((state) => state.data.auth);

    if (isLoggedIn) {
        return <Navigate to="/" />;
    }

    return (
        <Form>
            <h1>{message}</h1>
            <p>This can be your application</p>
            <TextField label="Email" name="email" type="email" value={email} />
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
    );
};

const MyForm = withFormik<MyFormProps, FormValues>({
    mapPropsToValues: (props) => {
        return {
            email: props.initEmail || '',
            password: ''
        };
    },
    validationSchema: Yup.object().shape({
        email: Yup.string().email('Email not valid').required('Email is required'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 charters')
            .required('Password is required')
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%&])(?=.{8,})/, 'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character')
    }),
    handleSubmit: async (values, { props }) => {
        try {
            const user = await login(values.email, values.password);
            if (!(user instanceof Error)) {
                props.dispatch(loginSuccess(user));
            }
        } catch (error: any) {
            props.dispatch(loginFail(error.message));
        }
    }
})(InnerForm);

const Login = () => (
    <div className={style.container}>
        <div className={style.auth}>
            <MyForm message="Login" dispatch={useAppDispatch()} />
        </div>
    </div>
);

export default Login;
