import { Form, Formik } from 'formik';
import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux.hooks';
import { getProduct, updateProduct } from '../../../services/products.services/products.services';
import * as Yup from 'yup';
import { TextField } from '../../validation/textField';
import { TextArea } from '../../validation/textArea';
import UploadImages from './uploadImages/uploadImages.component';
import { imageResize } from '../../../helpers/imageResize.helper';
import { ImageFiles } from '../typings';
import { updateOneProduct } from '../../../redux/slice/productsSlice';
import { SelectField } from '../../validation/selectField';
import { CatValues } from '../../../models/product.model';

interface FormValues {
    place?: string;
    price: string;
    size: string;
    phone: string;
    email: string;
    productName: string;
    content?: string;
    imageSrc?: string[] | string;
    file?: File[] | number;
    imageWidth?: string;
    imageHeight?: string;
    productsId?: string;
    category?: CatValues[];
}

export interface FilesUpload {
    files: Array<ImageFiles>;
}

interface Props extends FormValues {
    onSubmit: (values: FormValues) => Promise<void>;
    setIsSubmitting: Dispatch<SetStateAction<boolean>>;
    isSubmitting: boolean;
}

export const InnerForm = ({ imageSrc, onSubmit, isSubmitting, setIsSubmitting, productsId, place, price, phone, email, size, productName, content, category }: Props) => {
    let data: Array<ImageFiles> = [];

    const getImagesData = async (files: Array<ImageFiles> | undefined): Promise<void> => {
        if (files) {
            data = files;
        }
    };

    /* eslint-disable */
    const handleSubmit = useCallback(
        async (values: FormValues) => {
            let arrayImageWidth: number[] = [];
            let arrayImageHeight: number[] = [];
            let arr: Array<File> = [];
            let url: string[] = [];

            await Promise.all(
                data.map(async (e, i) => {
                    try {
                        if (e.data_url.includes('data:image/jpeg;base64') || e.data_url.includes('data:image/png;base64')) {
                            url.push('/');
                        } else {
                            url.push(e.data_url.replace('https://localhost:44346/Images/', ''));
                        }

                        if (e.file) {
                            const image = await imageResize(e.file, 'Product_image');
                            if (image?.width !== undefined && image?.height !== undefined) {
                                arrayImageWidth.push(image.width);
                                arrayImageHeight.push(image.height);
                                arr.push(e.file);
                                values = {
                                    ...values,
                                    file: arr,
                                    imageWidth: arrayImageWidth.toString(),
                                    imageHeight: arrayImageHeight.toString()
                                };
                            }
                        }
                        values = {
                            ...values,
                            imageSrc: url.toString(),
                            productsId: productsId
                        };
                        return { values };
                    } catch (err) {
                        throw err;
                    }
                })
            );

            setIsSubmitting(true);
            await onSubmit(values);
            setIsSubmitting(false);
        },
        [onSubmit]
    );
    /* eslint-disable */

    let newData: Array<ImageFiles> = [];

    if (imageSrc !== undefined) {
        for (let i = 0; i < imageSrc.length; i++) {
            newData = [...newData, { file: undefined, data_url: imageSrc[i] }];
        }
    }

    let words: string[] | undefined = [];
    if (category) {
        words = category[0].categoriesName?.split(' ');
    }

    const CategoryOptions = words?.map((r, key) => (
        <option value={r} key={key}>
            {r}
        </option>
    ));

    return (
        <Formik
            initialValues={{
                place: place || '',
                price: price || '',
                phone: phone || '',
                email: email || '',
                size: size || '',
                productName: productName || '',
                content: content || '',
                category: category || [],
                imageSrc: '',
                file: [],
                imageWidth: '',
                imageHeight: ''
            }}
            onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({
                place: Yup.string(),
                price: Yup.string(),
                phone: Yup.string(),
                size: Yup.string(),
                productName: Yup.string(),
                content: Yup.string()
            })}
        >
            <Form>
                <UploadImages imageSrc={newData} getImages={getImagesData} />
                <label>Place</label>
                <TextField id="place" name="place" placeholder="place" />
                <label>Price</label>
                <TextField id="price" name="price" type="price" />
                <label>Phone</label>
                <TextField id="phone" name="phone" type="phone" />
                <label>Email</label>
                <TextField id="mail" name="email" type="email" />
                <label>Size</label>
                <TextField id="size" name="size" type="size" />
                <label>Product name</label>
                <TextField id="productName" name="productName" type="productName" />
                <label>Category</label>
                <TextField id="Category" name="category" type="category" />
                <SelectField name="categories" as="select" value={'categories'}>
                    <option>Choice Category</option>
                    {CategoryOptions}
                </SelectField>
                <label>Description</label>
                <TextArea className={'style.profileTextArea'} id="Content" name="content" rows="20" />
                <button type="submit" disabled={isSubmitting}>
                    Edit
                </button>
            </Form>
        </Formik>
    );
};

const EditProduct: React.FC = () => {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const products = useAppSelector((state) => state.data.products);
    const product = products.$values.filter((p) => p.productsId === id);
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (Object.keys(product).length === 0) return null;

    const handleSubmit = async (values: any) => {
        let formData = new FormData();

        for (const key in values) {
            if (Object.prototype.hasOwnProperty.call(values, key) && typeof values[key] === 'string') {
                formData.append(key, values[key]);
            }
            if (Array.isArray(values[key])) {
                for (var val in values[key]) {
                    formData.append(`images`, values[key][val]);
                }
            }
        }
        try {
            const data = updateProduct(formData);
            if (!(data instanceof Error)) {
                const product = getProduct(values.productsId);
                dispatch(updateOneProduct(await product));
            }
        } catch (error: any) {
            // dispatch(loginFail(error.message));
        }
    };

    return (
        <div>
            <InnerForm
                isSubmitting={isSubmitting}
                setIsSubmitting={setIsSubmitting}
                onSubmit={handleSubmit}
                place={product[0].place}
                price={product[0].price}
                size={product[0].size}
                phone={product[0].phone}
                email={product[0].email}
                productName={product[0].postsDto.productName}
                content={product[0].postsDto.content}
                imageSrc={product[0].imageSrc.$values}
                productsId={id}
                category={product[0].categoriesDto.$values}
            />
        </div>
    );
};

export default EditProduct;
