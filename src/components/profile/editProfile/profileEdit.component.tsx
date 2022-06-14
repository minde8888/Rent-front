import { Props } from '../current.component';
import * as Yup from 'yup';
import { Form, FormikProps, withFormik } from 'formik';
import style from '../profile.module.scss';
import userImage from '../../../svg/add-image-frame-svgrepo-com.svg';
import { TextField } from '../../validation/textField';
import { useAppDispatch } from '../../../hooks/redux.hooks';
import { AnyAction, Dispatch } from '@reduxjs/toolkit';
import UploadImage from './uploadImage';
import { SetStateAction, useState } from 'react';

interface MyFormProps extends Props {
    dispatch: Dispatch<AnyAction>;
}

interface FormValues extends Props {
    image: any;
}

const ProfileEdit = (props: Props & FormikProps<FormValues>) => {
    const { error } = props;

    const passData = async (data: any): Promise<void> => {
        // setFile(await file);

        props.setFieldValue('image', await data.file);
    };

    return (
        <div className={style.columns}>
            <Form>
                <div className={style.columns}>
                    <div className={style.address}>
                        <div>
                            <h3>Address</h3>
                            <div>
                                <label htmlFor="country">country</label>
                                <TextField className={style.profileUpdate} id="country" name="country" placeholder="country" />
                                <label htmlFor="city">city</label>
                                <TextField className={style.profileUpdate} id="city" name="city" placeholder="city" />
                                <label htmlFor="street">street</label>
                                <TextField className={style.profileUpdate} id="street" name="street" placeholder="street" />
                                <label htmlFor="zip">zip</label>
                                <TextField className={style.profileUpdate} id="zip" name="zip" placeholder="zip" />
                                <label htmlFor="companyCode">company code</label>
                                <TextField className={style.profileUpdate} id="companyCode" name="companyCode" placeholder="companyCode" />
                            </div>
                        </div>
                    </div>
                    <UploadImage getImage={passData} />

                    <div className={style.image}>
                        <img src={userImage} alt={'imageName'} />
                        {error && <div className={style.profileError}>{'error'}</div>}
                    </div>

                    <div className={style.details}>
                        <div>
                            <h3>Details</h3>
                            <div>
                                <label htmlFor="occupation">occupation</label>
                                <TextField className={style.profileUpdate} id="occupation" name="occupation" placeholder="occupation" />
                                <label htmlFor="name">name</label>
                                <TextField className={style.profileUpdate} id="name" name="name" placeholder="name" />
                                <label htmlFor="surname">surname</label>
                                <TextField className={style.profileUpdate} id="surname" name="surname" placeholder="surname" />
                                <label htmlFor="phoneNumber">phone number</label>
                                <TextField className={style.profileUpdate} id="phoneNumber" name="phoneNumber" placeholder="phoneNumber" />
                                <label htmlFor="email">email</label>
                                <TextField className={style.profileUpdate} id="email" name="email" placeholder="email" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={style.bottom}>
                    <button className={style.edit} type="submit">
                        Save
                    </button>
                </div>
            </Form>
        </div>
    );
};

const MyForm = withFormik<MyFormProps, FormValues>({
    mapPropsToValues: (props) => {
        return {
            id: props.id || '',
            name: props.name || '',
            surname: props.surname || '',
            phoneNumber: props.phoneNumber || '',
            email: props.email || '',
            occupation: props.occupation || '',
            imageName: props.imageName || '',
            error: props.error || '',
            $id: props.address?.$id || '',
            city: props.address?.city || '',
            companyCode: props.address?.companyCode || '',
            country: props.address?.country || '',
            street: props.address?.street || '',
            zip: props.address?.zip || '',
            image: ''
        };
    },
    validationSchema: Yup.object().shape({
        email: Yup.string().email('Email not valid').required('Email is required'),
        image: Yup.mixed()
            .test('fileSize', 'File size too large, max file size is 1 Mb', (file) => file && file.size <= 1100000)
            .test('fileType', 'Incorrect file type', (file) => file && ['image/png', 'image/jpg', 'image/jpeg'].includes(file.type))
    }),
    handleSubmit: async (values, { props }) => {
        // console.log(props);
        console.log(values);

        try {
            // const user = await login(values.email, values.password);
            // if (!(user instanceof Error)) {
            //     props.dispatch(getUserProfile(user));
            //     if (typeof user.token === 'string' && typeof user.refreshToken === 'string') {
            //         props.dispatch(loginSuccess({ token: user.token, refreshToken: user.refreshToken }));
            //     }
            // }
        } catch (error: any) {
            // props.dispatch(loginFail(error.message));
        }
    }
})(ProfileEdit);

const Edit = ({ error, id, name, surname, phoneNumber, email, occupation, imageName, address }: Props) => (
    <div className={style.container}>
        <div className={style.auth}>
            <MyForm
                id={id}
                name={name}
                surname={surname}
                phoneNumber={phoneNumber}
                email={email}
                occupation={occupation}
                imageName={imageName}
                address={address}
                error={error}
                dispatch={useAppDispatch()}
            />
        </div>
    </div>
);

export default Edit;
