import { Form, Formik } from "formik";
import { Dispatch, FC, SetStateAction, useCallback, useState } from "react";
import { Navigate, NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux.hooks";
import { TextField } from "../../validation/textField";
import * as Yup from 'yup';
import style from "./contact.module.scss"
import { TextArea } from "../../validation/textArea";


interface FormValues {
    email: string;
    password: string;
}

export const InnerForm = (props: { onSubmit: (values: FormValues) => Promise<void>; message: string; phone: string; id: string }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { isLoggedIn, error } = useAppSelector((state) => state.data.auth);

    const { message, phone, onSubmit, id } = props;

    const handleSubmit = useCallback(
        async (values: FormValues) => {
            setIsSubmitting(true);
            await onSubmit(values);
            setIsSubmitting(false);
        },
        [onSubmit]
    );

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
                <h1>{message}</h1>
                <p>This can be your application</p>
                <div>{phone}</div>
                <div>{id}</div>
                <TextField label="Email" name="email" type="email" />
                <TextField label="Password" name="password" type="password" />
                <TextField label="Email" name="email" type="email" />
                <TextArea className={style.profileTextArea} label="Product description" name="productDescription" rows="20" />
                <button type="submit" disabled={isSubmitting}>
                    Submit
                </button>
                {error && (
                    <div className="error-group">
                        <div className="danger">{error}</div>
                    </div>
                )}
            </Form>
        </Formik>
    );
};

interface ChildPropsType {
    setToggle: Dispatch<SetStateAction<string>>
    phone: string;
    id: string;
}

const Contact: FC<ChildPropsType> = ({ setToggle, phone, id }) => {
    const dispatch = useAppDispatch();

    const close = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, value: string): void => {
        setToggle(value)
    }
    const handleSubmit = async (values: FormValues) => {
        // try {
        //     const user = await login(values.email, values.password);
        //     if (!(user instanceof Error)) {
        //         dispatch(getUserProfile(user));
        //         if (typeof user.token === 'string' && typeof user.refreshToken === 'string') {
        //             dispatch(loginSuccess({ token: user.token, refreshToken: user.refreshToken }));
        //         }
        //     }
        // } catch (error: any) {
        //     dispatch(loginFail(error.message));
        // }
    };

    return (
        <div className={style.container}>
            <div onClick={(e) => close(e, "")}> &#x274C;</div>
            <div className={style.auth}>
                <InnerForm message="Login" onSubmit={handleSubmit} phone={phone} id={id} />
            </div>
        </div>
    );
};

export default Contact;
