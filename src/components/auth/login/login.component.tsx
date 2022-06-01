import { Dispatch } from 'react';
import * as Yup from 'yup';
import { withFormik, FormikProps, Form } from 'formik';
import { login } from '../../../services/auth.services/auth.services';
import { useAppDispatch } from '../../../hooks/redux.hooks';
import { AnyAction } from 'redux';
import { loginFail, loginSuccess } from '../../../redux/slice/authSlice';
import axios from 'axios';
import { TextField } from '../validation/textField';

interface FormValues {
    email: string;
    password: string;
}

interface OtherProps {
    message: string;
}

const InnerForm = (props: OtherProps & FormikProps<FormValues>) => {
    const { isSubmitting, message } = props;
    const { email } = props.values;

    return (
        <Form>
            <h1>{message}</h1>
            <p>This can be anywhere in your application</p>
            <TextField label="Email" name="email" type="email" value={email} />
            <TextField label="Password" name="password" type="password" />
            <button type="submit" disabled={isSubmitting}>
                Login
            </button>
        </Form>
    );
};

interface MyFormProps {
    initEmail?: string;
    message: string;
    dispatch: Dispatch<AnyAction>;
}

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
            props.dispatch(loginSuccess(user));
        } catch (error) {
            if (axios.isAxiosError(error)) {
                props.dispatch(loginFail(error.message));
            } else {
                console.log('unexpected error: ', error);
                props.dispatch(loginFail('An unexpected error occurred'));
            }
        }
    }
})(InnerForm);

const Login = () => (
    <div>
        <MyForm message="Login" dispatch={useAppDispatch()} />
    </div>
);

export default Login;
