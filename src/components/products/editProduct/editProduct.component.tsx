import { Form, Formik } from 'formik';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux.hooks';
import { getOneProduct } from '../../../redux/slice/productSlice';
import { getProduct } from '../../../services/products.services/products.services';
import * as Yup from 'yup';
import { TextField } from '../../validation/textField';
import { TextArea } from '../../validation/textArea';
import UploadImages from './uploadImages/uploadImages.component';
import { imageResize } from '../../../helpers/imageResize.helper';
import { ImageData } from '../typings';

interface FormValues {
    place?: string;
    price: string;
    size: string;
    phone: string;
    email: string;
    productName: string;
    content?: string;
    imageSrc?: string[];
}

interface Props extends FormValues {
    onSubmit: (values: FormValues) => Promise<void>;
    setFieldValue: React.Dispatch<React.SetStateAction<PropState>>;
}

export const InnerForm = ({ imageSrc, onSubmit, setFieldValue }: Props) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { isLoggedIn, error } = useAppSelector((state) => state.data.auth);


    const getImagesData = async (files: [ImageData]): Promise<void> => {
        let arrayImageWidth: number[] = [];
        let arrayImageHeight: number[] = [];

        if (Object.keys(files).length !== 0) {


            files.map(async (e) => {
                const image = await imageResize(e.file, 'Product_image');
                if (image?.width !== undefined && image?.height !== undefined) {
                    arrayImageWidth.push(image.width);
                    arrayImageHeight.push(image.height);
                    setFieldValue({
                        file: files,
                        imageWidth: arrayImageWidth.toString(),
                        imageHeight: arrayImageHeight.toString()
                    });
                }
            });
        }
    };

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
                place: '',
                price: '',
                phone: '',
                email: '',
                size: '',
                productName: '',
                content: '',
                imageSrc: []
            }}
            onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({
                place: Yup.string(),
                price: Yup.string(),
                productCode: Yup.string(),
                size: Yup.string(),
                productName: Yup.string(),
                content: Yup.string()
            })}
        >
            <Form>
                <UploadImages imageSrc={imageSrc} getImages={getImagesData} />
                <TextField label="Place" name="place" type="place" />
                <TextField label="Price" name="price" type="price" />
                <TextField label="Phone" name="phone" type="phone" />
                <TextField label="mail" name="email" type="email" />
                <TextField label="Size" name="size" type="size" />
                <TextField label="ProductName" name="productName" type="productName" />
                <TextArea className={'style.profileTextArea'} label="Content" name="content" rows="20" />
                <button type="submit" disabled={isSubmitting}>
                    Edit
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

interface PropState {
    file: Array<ImageData>;
    imageWidth: string;
    imageHeight: string;
}

const EditProduct: React.FC = () => {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const [fieldValue, setFieldValue] = useState<PropState>({
        file: [],
        imageWidth: '',
        imageHeight: ''
    });

    useEffect(() => {
        (async () => {
            if (id) {
                const data = await getProduct(id);
                dispatch(getOneProduct(data));
            }
        })();
    }, []);

    const product = useAppSelector((state) => state.data.product);

    if (Object.keys(product).length === 0) return null;

    const handleSubmit = async (values: FormValues) => {
        // console.log(id);
        // console.log(values);
        console.log(fieldValue);


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
        <div>
            <InnerForm
                setFieldValue={setFieldValue}
                onSubmit={handleSubmit}
                place={product.$values[0].place}
                price={product.$values[0].price}
                size={product.$values[0].size}
                phone={product.$values[0].phone}
                email={product.$values[0].email}
                productName={product.$values[0].postsDto.productName}
                content={product.$values[0].postsDto.content}
                imageSrc={product.$values[0].imageSrc.$values}
            />
        </div>
    );
};

export default EditProduct;
