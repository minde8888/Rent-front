import * as Yup from 'yup';
import { Form, FormikProps, withFormik } from 'formik';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux.hooks';
import { AnyAction, Dispatch } from '@reduxjs/toolkit';
import { imageResize } from '../../../helpers/imageResize.helper';
import style from './addProduct.module.scss';
import UploadProductImages from './uploadImages/uploadProductImages.component';
import { Product, ImageData } from '../typings';
import ProductDescription from './productDescription/productDescription.component';
import { addProduct } from '../../../services/products.services/products.services';

interface ProductProps extends Product {
    productName?: string;
    dispatch: Dispatch<AnyAction>;
}

interface FormValues extends Product {
    productName: string;
}

const ProfileEdit = ({ errors, isSubmitting, setFieldValue, values }: FormikProps<FormValues>) => {

    const getImagesData = async (files: [ImageData]): Promise<void> => {
        let arrayImageWidth: number[] = [];
        let arrayImageHeight: number[] = [];

        if (Object.keys(files).length !== 0) {
            setFieldValue('images', files);
            files.map(async (e) => {
                const image = await imageResize(e.file, 'Product_image');
                if (image?.width !== undefined && image?.height !== undefined) {
                    arrayImageWidth.push(image.width);
                    arrayImageHeight.push(image.height);
                    setFieldValue('imageWidth', arrayImageWidth.toString());
                    setFieldValue('imageHeight', arrayImageHeight.toString());
                }
            });
        }
    };

    const { productName, price, place, phone, category } = values;

    return (
        <div className={style.container}>
            <Form>
                <div className={style.columns}>
                    <UploadProductImages getImages={getImagesData} />
                </div>
                <div className={style.columns}>
                    <ProductDescription productName={productName} price={price} place={place} phone={phone} category={category} />
                    <div className={style.saveProduct}>
                        <button type="submit" disabled={isSubmitting}>
                            Save
                        </button>
                    </div>
                </div>
            </Form>
        </div>
    );
};

const ProductForm = withFormik<ProductProps, FormValues>({
    mapPropsToValues: (props) => {
        return {
            productName: props.productName || '',
            attachments: props.imageFile || undefined,
            imageName: props.imageName || '',
            imageHeight: props.height || '',
            imageWidth: props.width || '',
            price: props.price || '',
            size: props.size || '',
            place: props.place || '',
            phone: props.phone || '',
            email: props.email || '',
            category: props.category || '',
            sellerId: props.sellerId || ''
        };
    },
    validationSchema: Yup.object().shape({
        productName: Yup.string(),
        imageName: Yup.string(),
        imageHeight: Yup.string(),
        imageWidth: Yup.string(),
        price: Yup.string(),
        size: Yup.string(),
        place: Yup.string(),
        phone: Yup.string()
            .matches(/^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/, 'Phone number is not valid')
            .min(11, 'Must be 10 characters')
            .max(11, 'Must be 10 characters'),
        email: Yup.string().email('Email not valid').required('Email is required'),
        category: Yup.string(),
        sellerId: Yup.string()
    }),
    handleSubmit: async (values: any, { setErrors }) => {
        let formData = new FormData();
        console.log(values);

        for (const key in values) {
            if (Object.prototype.hasOwnProperty.call(values, key) && typeof values[key] === 'string') {
                formData.append(key, values[key]);
            }
            if (Array.isArray(values[key])) {
                for (var val in values[key]) {
                    formData.append(`images`, values[key][val].file);
                }
            }
        }

        try {
            if (typeof values.sellerId === 'string') {
                addProduct(formData);
            }
        } catch (error: any) {
            setErrors(error);
        }
    }
})(ProfileEdit);

const AddProduct = () => {
    const { id } = useAppSelector((state) => state.data.user);

    return (
        <div className={style.auth}>
            <ProductForm dispatch={useAppDispatch()} sellerId={id} />
        </div>
    );
};

export default AddProduct;
