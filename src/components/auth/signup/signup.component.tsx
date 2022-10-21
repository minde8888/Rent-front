import { useCallback, useState } from 'react';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import { register } from '../../../services/auth.services/auth.services';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux.hook';
import { SelectField } from '../../validation/selectField';
import { TextField } from '../../validation/textField';
import style from '../auth.module.scss';
import { NavLink, useNavigate } from 'react-router-dom';
import { Roles } from '../roles/roles.const';
import { registerFail } from '../../../redux/slice/authSlice';

interface FormValues {
    name: string;
    surname: string;
    mobile: string;
    email: string;
    password: string;
    confirmPassword: string;
    role: string;
}

export const InnerForm = (props: { onSubmit: (values: FormValues) => Promise<void>; message: string }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    let { error } = useAppSelector((state) => state.data.auth);

    const roles = [Roles.user, Roles.customer];
    const roleOptions = roles.map((r, key) => (
        <option value={r} key={key}>
            {r}
        </option>
    ));
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
    return (
        <Formik
            initialValues={{
                name: '',
                surname: '',
                mobile: '',
                email: '',
                role: '',
                password: '',
                confirmPassword: ''
            }}
            onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({
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
            })}
        >
            <Form>
                <h1>{props.message}</h1>
                <p>This can be your application</p>
                <TextField label="First Name" name="name" type="text" />
                <TextField label="Last Name" name="surname" type="text" />
                <TextField label="+4712345678" name="mobile" type="phoneNumber" />
                <TextField label="Email" name="email" type="email" />
                <TextField label="Password" name="password" type="password" />
                <TextField label="Confirm Password" name="confirmPassword" type="password" />
                <SelectField name="role" as="select">
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
                        <div className="danger">{error}</div>
                    </div>
                )}
                <div className={style.links}>
                    Du you have account ?
                    <NavLink to={'/login'} className="nav-link">
                        Login
                    </NavLink>
                </div>
            </Form>
        </Formik>
    );
};

const SignUp = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const handleSubmit = async (values: FormValues) => {
        try {
            const response = await register(values.name, values.surname, values.mobile, values.email, values.password, values.role);
            if (response.status === 200) {
                navigate('/login', { replace: true });
            }
        } catch (error: any) {
            dispatch(registerFail(error.message));
        }
    };
    return (
        <div className={style.container}>
            <div className={style.auth}>
                <InnerForm message="Sign up" onSubmit={handleSubmit} />
            </div>
        </div>
    );
};

export default SignUp;
