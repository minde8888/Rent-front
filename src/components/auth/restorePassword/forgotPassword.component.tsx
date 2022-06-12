import { Dispatch, SetStateAction, useState } from 'react';
import * as Yup from 'yup';
import { withFormik, FormikProps, Form } from 'formik';
// import { login } from '../../../services/auth.services/auth.services';
// import { useAppDispatch } from '../../../hooks/redux.hooks';
// import { AnyAction } from 'redux';
// import { loginFail, loginSuccess } from '../../../redux/slice/authSlice';
import { TextField } from '../validation/textField';
// import { Navigate, NavLink } from 'react-router-dom';
// import { useAppSelector } from '../../../hooks/redux.hooks';
import style from '../auth.module.scss';
import { sendPasswordToEmail } from '../../../services/auth.services/password.services/password.services';

type FormValues = {
    email: string;
};

type OtherProps = {
    message: string;
};

type MyFormProps = {
    initEmail?: string;
    message: string;
    setError: Dispatch<SetStateAction<string>>;
};

const InnerForm = (props: OtherProps & FormikProps<FormValues>) => {
    // var search = window.location.search;
    // var params = new URLSearchParams(search);

    // const [tokenEmail, setTokenEmail] = useState({
    //     token: params.get("token"),
    //     email: params.get("email")
    // });

    const [error, setError] = useState('');
    console.log(error);

    const { isSubmitting, message } = props;
    const { email } = props.values;

    return (
        <Form>
            <h1>{message}</h1>
            <p>This can be your application</p>
            <TextField label="Email" name="email" type="email" value={email} />
            <button type="submit" disabled={isSubmitting}>
                Login
            </button>
            {error && (
                <div className="error-group">
                    <div className="danger">{error}</div>
                </div>
            )}
        </Form>
    );
};

const MyForm = withFormik<MyFormProps, FormValues>({
    mapPropsToValues: (props) => {
        return {
            email: props.initEmail || ''
        };
    },
    validationSchema: Yup.object().shape({
        email: Yup.string().email('Email not valid').required('Email is required')
    }),
    handleSubmit: async (values, { props }) => {
        try {
            await sendPasswordToEmail(values.email);
        } catch (error: any) {
            console.log(props);
            props.setError(error.message);
        }
    }
})(InnerForm);

const ForgotPassword = () => (
    <div className={style.container}>
        <div className={style.auth}>
            <MyForm message="Forgot Password" setError={useState} />
        </div>
    </div>
);

export default ForgotPassword;
