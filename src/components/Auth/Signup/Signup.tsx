import React, { Dispatch } from 'react';
import * as Yup from 'yup';
import { withFormik, FormikProps, FormikErrors, Form, Field } from 'formik';
import { login } from '../../../services/auth.services/auth.services';
import { useAppSelector, useAppDispatch } from '../../../hooks/redux.hooks';
import { AnyAction } from 'redux';
import { useDispatch } from 'react-redux';
import { connect, ConnectedProps } from 'react-redux';
import { loginFail } from '../../../redux/slice/authSlice';

// Shape of form values
interface FormValues {
    email: string;
    password: string;
}

interface OtherProps {
    message: string;
}

// Aside: You may see InjectedFormikProps<OtherProps, FormValues> instead of what comes below in older code.. InjectedFormikProps was artifact of when Formik only exported a HoC. It is also less flexible as it MUST wrap all props (it passes them through).
const InnerForm = (props: OtherProps & FormikProps<FormValues>) => {
    const { touched, errors, isSubmitting, message } = props;

    return (
        <Form>
            <h1>{message}</h1>
            <Field type="email" name="email" />
            {touched.email && errors.email && <div>{errors.email}</div>}

            <Field type="password" name="password" />
            {touched.password && errors.password && <div>{errors.password}</div>}

            <button type="submit" disabled={isSubmitting}>
                Submit
            </button>
        </Form>
    );
};

// The type of props MyForm receives
interface MyFormProps {
    initialEmail?: string;
    message: string; // if this passed all the way through you might do this or make a union type
    dispatch: Dispatch<AnyAction>;
}

// Wrap our form with the withFormik HoC
const MyForm = withFormik<MyFormProps, FormValues>({
    // Transform outer props into form values

    mapPropsToValues: (props) => {
        return {
            email: props.initialEmail || '',
            password: ''
        };
    },

    // Add a custom validation function (this can be async too!)
    validationSchema: Yup.object().shape({
        email: Yup.string().email('Email not valid').required('Email is required'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 charters')
            .required('Password is required')
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%&])(?=.{8,})/, 'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character')
    }),

    handleSubmit: (values) => {
        console.log(values);

        dispatch(loginFail(values.email));
        // do submitting things
    }
})(InnerForm);

// Use <MyForm /> wherevs
const SignUp = () => {
    let state = useAppSelector((state) => state);
    console.log(state);

    return (
        <div>
            <h1>My App</h1>
            <p>This can be anywhere in your application</p>
            <MyForm message="Sign up" dispatch={useAppDispatch()} />
        </div>
    );
};

export default SignUp;
function dispatch(arg0: { payload: string; type: string }) {
    throw new Error('Function not implemented.');
}
