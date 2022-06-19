import { Props } from '../current.component';
import * as Yup from 'yup';
import { Form, FormikProps, withFormik } from 'formik';
import style from '../profile.module.scss';
import userImage from '../../../svg/add-image-frame-svgrepo-com.svg';
import { TextField } from '../../validation/textField';
import { useAppDispatch } from '../../../hooks/redux.hooks';
import { AnyAction, Dispatch } from '@reduxjs/toolkit';
import UploadImage from './uploadImage';
import { imageResize } from '../../../helpers/imageResize.helper';
import { updateUser } from '../../../services/user.services/user.services';
import { updateProfile } from '../../../redux/slice/userSlice';
import left from '../../../svg/7122550_arrow_left_icon.svg'

interface EditProps extends Props {
    dispatch: Dispatch<AnyAction>;
}

interface FormValues extends Props { }

const ProfileEdit = (props: Props & FormikProps<FormValues>) => {
    const { errors, imageSrc, isSubmitting } = props;

    const goBack = (): void => {
        props.passToggle();
    }

    const passData = async (file: File): Promise<void> => {
        if (Object.keys(file).length === 0) {
            props.setFieldValue('imageFile', file);
            props.setFieldValue('imageName', file.name);
            const image = await imageResize(file, 'Profile_image');
            props.setFieldValue('width', image?.width);
            props.setFieldValue('height', image?.height);
        }
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
                    <UploadImage getImage={passData} imageSrc={imageSrc} />
                    <div className={style.image}>
                        <img src={userImage} alt={'imageName'} />
                        {errors && <div className={style.profileError}>{errors.message}</div>}
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
                    <button className={style.edit} type="submit" disabled={isSubmitting}>
                        Save
                    </button>
                    <div className={style.arrowBack} onClick={goBack}>
                        <img src={left} alt="" />
                        Go back
                    </div>
                </div>
            </Form>
        </div>
    );
};

const EditForm = withFormik<EditProps, FormValues>({
    mapPropsToValues: (props) => {
        return {
            id: props.id || '',
            name: props.name || '',
            surname: props.surname || '',
            phoneNumber: props.phoneNumber || '',
            email: props.email || '',
            occupation: props.occupation || '',
            imageName: props.imageName || '',
            $id: props.address?.$id || '',
            city: props.address?.city || '',
            companyCode: props.address?.companyCode || '',
            country: props.address?.country || '',
            street: props.address?.street || '',
            zip: props.address?.zip || '',
            height: props.height || '',
            width: props.width || '',
            passToggle: props.passToggle || ''

        };
    },
    validationSchema: Yup.object().shape({
        name: Yup.string()
            .max(20, 'Must be 20 characters or less'),
        surname: Yup.string()
            .max(20, 'Must be 20 characters or less'),
        phoneNumber: Yup.string()
            .matches(/^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/,
                'Phone number is not valid')
            .max(11, 'Must be 10 characters'),
        email: Yup.string().email(),
        occupation: Yup.string(),
        city: Yup.string(),
        companyCode: Yup.string(),
        country: Yup.string(),
        street: Yup.string(),
        zip: Yup.string()


    }),
    handleSubmit: async (values, { setErrors, props }) => {

        let formData = new FormData();
        Object.entries(values).forEach(([key, value]) => {
            if (value !== undefined) formData.append(key, value);
        });

        try {
            if (values.id !== undefined) {
                const user = await updateUser(formData, values.id);
                props.dispatch(updateProfile(user));

                if ((Object.keys(user).length !== 0)) props.passToggle()
            }
        } catch (error: any) {
            setErrors(error)
        }
    }
})(ProfileEdit);

const Edit = ({ passToggle, id, name, surname, phoneNumber, email, occupation, imageName, address, imageSrc }: Props) => (
    <div className={style.container}>
        <div className={style.auth}>
            <EditForm
                id={id}
                name={name}
                surname={surname}
                phoneNumber={phoneNumber}
                email={email}
                occupation={occupation}
                imageName={imageName}
                address={address}
                passToggle={passToggle}
                dispatch={useAppDispatch()}
                imageSrc={imageSrc}
            />
        </div>
    </div>
);

export default Edit;
