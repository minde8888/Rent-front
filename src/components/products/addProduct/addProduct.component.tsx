import * as Yup from 'yup';
import { Form, FormikProps, withFormik } from 'formik';
import userImage from '../../../svg/add-image-frame-svgrepo-com.svg';

import { useAppDispatch } from '../../../hooks/redux.hooks';
import { AnyAction, Dispatch } from '@reduxjs/toolkit';
import { imageResize } from '../../../helpers/imageResize.helper';

import style from './addProduct.module.scss';
import UploadProductImages from '../addProduct/uploadImages/uploadProductImages';
import { Product, ImageData } from '../typings';
import ProductDescription from './productDescription';
import ProductSpecifications from './productSpecifications';

interface ProductProps extends Product {
    productName?: string;
    dispatch: Dispatch<AnyAction>;
}

interface FormValues extends Product {
    productName: string;
}

const ProfileEdit = (props: FormikProps<FormValues>) => {
    const { errors, isSubmitting, setFieldValue } = props;

    const getImagesData = async (files: [ImageData]): Promise<void> => {
        if (Object.keys(files).length !== 0) {
            setFieldValue('attachments', files);
        }
    };

    const { productName,
        quantityPerUnit,
        unitPrice,
        unitsInStock,
        warehousePlace,
        productCode } = props.values


    const toggle = (event: React.MouseEvent<HTMLHeadingElement>) => {
        // console.log(event.target.children[0].classList.value);
        // (event.target as Element).children[0].classList.value = "display:none"
        // event.target.classList()
    };

    return (
        <div className={style.container}>
            <Form>
                <div className={style.columns}>
                    <UploadProductImages getImages={getImagesData} />
                </div>
                <div className={style.columns}>
                    <ProductDescription
                        productName={productName}
                        quantityPerUnit={quantityPerUnit}
                        unitPrice={unitPrice}
                        unitsInStock={unitsInStock}
                        warehousePlace={warehousePlace}
                        productCode={productCode} />
                    <ProductSpecifications />
                    <div className={style.bottom}>
                        <button className={style.edit} type="submit" disabled={isSubmitting}>
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
            description: props.description || '',
            attachments: props.imageFile || undefined,
            imageName: props.imageName || '',
            height: props.height || '',
            width: props.width || '',
            quantityPerUnit: props.quantityPerUnit || '',
            unitPrice: props.unitPrice || '',
            unitsInStock: props.unitsInStock || '',
            warehousePlace: props.warehousePlace || '',
            categories: props.categories || '',
            maxLoad: props.maxLoad || '',
            weight: props.weight || '',
            liftingHeight: props.liftingHeight || '',
            capacity: props.capacity || '',
            energySource: props.energySource || '',
            speed: props.speed || '',
            length: props.length || '',
            productWidth: props.productWidth || '',
            productHeight: props.productHeight || '',
            productCode: props.productCode || ''

        };
    },
    validationSchema: Yup.object().shape({
        productName: Yup.string(),
        description: Yup.string(),
        imageName: Yup.string(),
        warehousePlace: Yup.string(),
        categories: Yup.string(),
        energySource: Yup.string(),
        productCode: Yup.string(),
        speed: Yup.number(),
        length: Yup.number(),
        height: Yup.number(),
        width: Yup.number(),
        quantityPerUnit: Yup.number(),
        unitPrice: Yup.number(),
        unitsInStock: Yup.number(),
        maxLoad: Yup.number(),
        weight: Yup.number(),
        liftingHeight: Yup.number(),
        capacity: Yup.number(),
        productWidth: Yup.number(),
        productHeight: Yup.number(),
    }),
    handleSubmit: async (values, { setErrors, props }) => {
        // let formData = new FormData();
        // Object.entries(values).forEach(([key, value]) => {
        //     if (value !== undefined) formData.append(key, value);
        // });
        console.log(values);

        // try {
        //     if (values.id !== undefined) {
        //         const user = await updateUser(formData, values.id);
        //         props.dispatch(updateProfile(user));

        //         if ((Object.keys(user).length !== 0)) props.passToggle()
        //     }
        // } catch (error: any) {
        //     setErrors(error)
        // }
    }
})(ProfileEdit);

const AddProduct = () => (
    <div className={style.auth}>
        <ProductForm dispatch={useAppDispatch()} />
    </div>
);

export default AddProduct;
