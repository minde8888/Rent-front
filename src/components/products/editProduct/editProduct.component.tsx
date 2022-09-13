import { Form, Formik } from 'formik';
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux.hooks';
import { getOneProduct } from '../../../redux/slice/productSlice';
import { getProduct } from '../../../services/products.services/products.services';
import * as Yup from 'yup';
import { TextField } from '../../validation/textField';
import { TextArea } from '../../validation/textArea';
import UploadImages from './uploadImages/uploadImages.component';
import { imageResize } from '../../../helpers/imageResize.helper';
import { ImageFiles } from '../typings';

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

export interface FilesUpload {
    files: Array<{ file?: File; data_url: string }>;
}

interface Props extends FormValues {
    onSubmit: (values: FormValues) => Promise<void>;
    setIsSubmitting: Dispatch<SetStateAction<boolean>>;
    isSubmitting: boolean;
}

export const InnerForm = ({ imageSrc, onSubmit, isSubmitting, setIsSubmitting }: Props) => {
    const { isLoggedIn, error } = useAppSelector((state) => state.data.auth);
    const [imageState, setImageState] = useState<Array<{ file?: File; data_url: string }> | undefined>(undefined);

    let data: Array<{ file?: File; data_url: string }> = [];

    const getImagesData = async (files: Array<{ file?: File; data_url: string }> | undefined): Promise<void> => {
        if (files) {
            data = files;
        }
    };

    const handleSubmit = useCallback(
        async (values: FormValues) => {
            let arrayImageWidth: number[] = [];
            let arrayImageHeight: number[] = [];
            let arr: Array<File> = [];

            data.map(async (e) => {
                if (e.file) {
                    const image = await imageResize(e.file, 'Product_image');

                    if (image?.width !== undefined && image?.height !== undefined) {
                        arrayImageWidth.push(image.width);
                        arrayImageHeight.push(image.height);
                        arr.push(e.file);
                        console.log({
                            file: arr,
                            imageWidth: arrayImageWidth.toString(),
                            imageHeight: arrayImageHeight.toString()
                        });
                    }
                }
            });
            setIsSubmitting(true);
            await onSubmit(values);
            setIsSubmitting(false);
        },
        [onSubmit]
    );

    let newData: Array<{ file?: File; data_url: string }> = [];

    if (imageSrc !== undefined) {
        for (let i = 0; i < imageSrc.length; i++) {
            newData = [...newData, { file: undefined, data_url: imageSrc[i] }];
        }
    }

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
                <UploadImages imageSrc={newData} getImages={getImagesData} />
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
    file: Array<File>;
    imageWidth: string;
    imageHeight: string;
}

const EditProduct: React.FC = () => {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const [isSubmitting, setIsSubmitting] = useState(false);
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
        console.log(values);
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
                isSubmitting={isSubmitting}
                setIsSubmitting={setIsSubmitting}
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
