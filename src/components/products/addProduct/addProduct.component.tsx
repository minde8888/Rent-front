import * as Yup from 'yup';
import { Form, FormikProps, withFormik } from 'formik';

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
        let arrayImageWidth: number[] = [];
        let arrayImageHeight: number[] = [];

        if (Object.keys(files).length !== 0) {
            setFieldValue('attachments', files);

            files.map(async (e) => {
                const image = await imageResize(e.file, 'Product_image');
                if (image?.width !== undefined && image?.height !== undefined) {
                    arrayImageWidth.push(image.width);
                    arrayImageHeight.push(image.height);
                    setFieldValue('width', arrayImageWidth.toString());
                    setFieldValue('height', arrayImageHeight.toString());
                }
            });
        }
    };

    const { productName, quantityPerUnit, unitPrice, unitsInStock, warehousePlace, productCode, addCategory } = props.values;

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
                        productCode={productCode}
                        addCategory={addCategory}
                    />
                    <ProductSpecifications />
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
            productCode: props.productCode || '',
            addCategory: props.addCategory || ''
        };
    },
    validationSchema: Yup.object().shape({
        productName: Yup.string(),
        imageName: Yup.string(),
        warehousePlace: Yup.string(),
        categories: Yup.string(),
        energySource: Yup.string(),
        productCode: Yup.string(),
        speed: Yup.string(),
        length: Yup.string(),
        height: Yup.string(),
        width: Yup.string(),
        quantityPerUnit: Yup.number(),
        unitPrice: Yup.number(),
        unitsInStock: Yup.number(),
        addCategory: Yup.string(),
        maxLoad: Yup.string(),
        weight: Yup.string(),
        liftingHeight: Yup.string(),
        capacity: Yup.string(),
        productWidth: Yup.string(),
        productHeight: Yup.string()
    }),
    handleSubmit: async (values, { setErrors, props }) => {
        let formData = new FormData();
        Object.entries(values).forEach(([key, value]) => {
            if (value !== undefined) formData.append(key, value);
            if (Array.isArray(value)) {
                for (const key in value) {
                    if (Object.prototype.hasOwnProperty.call(value, key)) {
                        formData.append('image' + key, value[key].file);
                    }
                }
                // console.log(value);
            }
        });
        console.log(Object.fromEntries(formData));
        // console.log(values);

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
