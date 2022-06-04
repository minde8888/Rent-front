import { Dispatch } from 'react';
import * as Yup from 'yup';
import { withFormik, FormikProps, Form, Field } from 'formik';
import { register } from '../../../services/auth.services/auth.services';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux.hooks';
import { AnyAction } from 'redux';
import { registerFail } from '../../../redux/slice/authSlice';
import { SelectField } from '../validation/selectField';
import axios from 'axios';
import { TextField } from '../validation/textField';

interface FormValues {
    name: string;
    surname: string;
    mobile: string;
    email: string;
    password: string;
    confirmPassword: string;
    role: string;
}

interface OtherProps {
    message: string;
}

const InnerForm = (props: OtherProps & FormikProps<FormValues>) => {
    const { isSubmitting, message } = props;
    const { name, surname, mobile, role, email } = props.values;
    let { error } = useAppSelector((state) => state.data.auth);

    const roles = ['User', 'Client'];
    const roleOptions = roles.map((r, key) => (
        <option value={r} key={key}>
            {r}
        </option>
    ));
    return (
        <Form>
            <h1>{message}</h1>
            <p>This can be anywhere in your application</p>
            <TextField label="First Name" name="name" type="text" value={name} />
            <TextField label="Last Name" name="surname" type="text" value={surname} />
            <TextField label="+4712345678" name="mobile" type="phoneNumber" value={mobile} />
            <TextField label="Email" name="email" type="email" value={email} />
            <TextField label="Password" name="password" type="password" />
            <TextField label="Confirm Password" name="confirmPassword" type="password" />
            <SelectField name="role" as="select" value={role}>
                <option>Choice Role</option>
                {roleOptions}
            </SelectField>
            <button type="submit" disabled={isSubmitting}>
                SignUp
            </button>
            <button type="reset" disabled={isSubmitting}>
                Reset
            </button>
            {error && (
                <div className="error-group">
                    <div className="danger">
                        {error}
                    </div>
                </div>
            )}
        </Form>
    );
};

interface MyFormProps {
    initName?: string;
    initSurname?: string;
    initMobile?: string;
    initEmail?: string;
    initRole?: string;
    message: string;
    dispatch: Dispatch<AnyAction>;
}

const MyForm = withFormik<MyFormProps, FormValues>({
    mapPropsToValues: (props) => {
        return {
            name: props.initName || '',
            surname: props.initSurname || '',
            mobile: props.initMobile || '',
            email: props.initEmail || '',
            role: props.initRole || '',
            password: '',
            confirmPassword: ''
        };
    },

    validationSchema: Yup.object().shape({
        name: Yup.string().max(15, 'Must be 15 characters or less').required('Required'),
        surname: Yup.string().max(20, 'Must be 20 characters or less').required('Required'),
        mobile: Yup.string()
            .matches(/^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/, 'Phone number is not valid')
            .min(11, 'Must be 10 characters')
            .max(11, 'Must be 10 characters'),
        email: Yup.string().email('Email not valid').required('Email is required'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 charters')
            .required('Password is required')
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%&])(?=.{8,})/, 'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Password must match')
            .required('Confirm password is required'),
        role: Yup.string().required('Please select a role').oneOf(['User', 'Client'])
    }),

    handleSubmit: async (values, { props }) => {
        try {
            await register(values.name, values.surname, values.mobile, values.email, values.password, values.role);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                props.dispatch(registerFail(error.message));
            } else {
                console.log('unexpected error: ', error);
                props.dispatch(registerFail('An unexpected error occurred'));
            }
        }
    }
})(InnerForm);

const SignUp = () => (
    <div>
        <MyForm message="Sign up" dispatch={useAppDispatch()} />
    </div>
);

export default SignUp;
