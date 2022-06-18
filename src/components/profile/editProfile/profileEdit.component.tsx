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

interface MyFormProps extends Props {
    dispatch: Dispatch<AnyAction>;
}

interface FormValues extends Props { }

const ProfileEdit = (props: Props & FormikProps<FormValues>) => {
    const { error, errors, imageSrc } = props;

    const passData = async (file: File): Promise<void> => {

        props.setFieldValue('imageFile', file);
        props.setFieldValue('imageName', file.name);
        const image = await imageResize(file, 'Profile_image');
        props.setFieldValue('width', image?.width);
        props.setFieldValue('height', image?.height);
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
                    <UploadImage getImage={passData} errors={errors.imageFile} imageSrc={imageSrc} />
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
            $id: props.address?.$id || '',
            city: props.address?.city || '',
            companyCode: props.address?.companyCode || '',
            country: props.address?.country || '',
            street: props.address?.street || '',
            zip: props.address?.zip || '',
            imageFile: props.imageFile || undefined,
            height: props.height || '',
            width: props.width || ''
        };
    },
    validationSchema: Yup.object().shape({
        email: Yup.string().email('Email not valid').required('Email is required'),
        imageFile: Yup.mixed()
            .test('fileType', 'Incorrect file type', (file) => file && ['image/png', 'image/jpg', 'image/jpeg'].includes(file.type))
            .test('fileSize', 'File size too large, max file size is 1 Mb', (file) => file && file.size <= 1100000)

    }),
    handleSubmit: async (values, { props }) => {

        let formData = new FormData();
        Object.entries(values).forEach(([key, value]) => {
            if (value !== undefined) formData.append(key, value);
        });

        try {
            if (values.id !== undefined) {
                const user = await updateUser(formData, values.id);
                props.dispatch(updateProfile(user));
            }
        } catch (error: any) {
            // props.dispatch(loginFail(error.message));
        }
    }
})(ProfileEdit);

const Edit = ({ error, id, name, surname, phoneNumber, email, occupation, imageName, address, imageSrc }: Props) => (
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
                imageSrc={imageSrc}
            />
        </div>
    </div>
);

export default Edit;
