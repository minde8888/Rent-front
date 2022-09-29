import { Field, FieldArray, Form, Formik } from 'formik';
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
import { CatValues } from '../../../models/product.model';
import style from './editProduct.module.scss';
import EditCategory from './editCategory/editCategory';
import Modal from '../../modal/modal.component';
import useModal from '../../../hooks/useModal';

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
    categories?: CatValues[];
}

export interface FilesUpload {
    files: Array<ImageFiles>;
}

interface Props extends FormValues {
    onSubmit: (values: FormValues) => Promise<void>;
    setIsSubmitting: Dispatch<SetStateAction<boolean>>;
    isSubmitting: boolean;
    // category?: CatValues[];
}

export const InnerForm = ({ imageSrc, onSubmit, isSubmitting, setIsSubmitting, productsId, place, price, phone, email, size, productName, content, categories }: Props) => {
    const { isOpen, toggle } = useModal();
    const onCancel = () => toggle();

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

    // const categories = category?.map((el) => {
    //     return el.categories;
    // });

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
                categories: categories,
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
                content: Yup.string(),
                categories: Yup.string()
            })}
        >
            <Form>
                <div>
                    <UploadImages imageSrc={newData} getImages={getImagesData} />
                </div>
                <div className={style.description}>
                    <div className={style.inp}>
                        <div>
                            <label>Place</label>
                            <TextField id="place" name="place" placeholder="place" />
                        </div>
                        <div>
                            <label>Price</label>
                            <TextField id="price" name="price" type="price" />
                        </div>
                        <div>
                            <label>Phone</label>
                            <TextField id="phone" name="phone" type="phone" />
                        </div>
                        <div>
                            <label>Email</label>
                            <TextField id="mail" name="email" type="email" />
                        </div>
                        <div>
                            <label>Size</label>
                            <TextField id="size" name="size" type="size" />
                        </div>
                    </div>
                    <div className={style.content}>
                        <label>Product name</label>
                        <TextField id="productName" name="productName" type="productName" />
                        <label>Description</label>
                        <TextArea className={'style.profileTextArea'} id="Content" name="content" rows="20" />
                    </div>
                </div>
                <div className={style.col}>
                    {/* <TextField id="Categories" name="categories" type={el.categories} /> */}
                    {/* <div> {el.categories} </div> */}
                    {/* <button type="button">❌</button> */}
                    {/* <FieldArray name="categories">
                        render={({ insert, remove, push }) => (
                  
                        )}
                    </FieldArray> */}
                    <div>
                        {/* {categories?.map((el, index) => (
                            <div key={index}>
                                <TextField id="Categories" name="categories" type="categories" />
                                <Field id="categories" name={el.categories} type="text" />
                                <button type="button">❌</button>
                            </div>
                        ))} */}
                        {/* <EditCategory categories={categories !== undefined ? categories : []} /> */}
                        <button onClick={toggle}>Open Modal </button>
                        <Modal isOpen={isOpen} toggle={toggle}>
                            <EditCategory onCancel={onCancel} categories={categories !== undefined ? categories : []} />
                        </Modal>
                    </div>

                    {/* <div className={style.category}>
                        <label>Categories</label>
                        <TextField id="Categories" name="categoriesName" type="categoriesName" />
                    </div> */}

                    <button type="submit" disabled={isSubmitting}>
                        Save
                    </button>
                </div>
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
    console.log(product);

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
                categories={product[0].categoriesDto.$values}
            />
        </div>
    );
};

export default EditProduct;
