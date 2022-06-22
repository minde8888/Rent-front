import * as Yup from 'yup';
import { Form, FormikProps, withFormik } from 'formik';
import userImage from '../../../svg/add-image-frame-svgrepo-com.svg';
import { TextField } from '../../validation/textField';
import { useAppDispatch } from '../../../hooks/redux.hooks';
import { AnyAction, Dispatch } from '@reduxjs/toolkit';
import { imageResize } from '../../../helpers/imageResize.helper';
import { updateUser } from '../../../services/user.services/user.services';
import { updateProfile } from '../../../redux/slice/userSlice';
import { TextArea } from '../../validation/textArea';
import style from './addProduct.module.scss';
import { SelectField } from '../../validation/selectField';
import UploadProductImages from '../addProduct/uploadImages/uploadProductImages';
import { Product, ImageData } from '../typings';

interface ProductProps extends Product {
    dispatch: Dispatch<AnyAction>;
}

interface FormValues extends Product {}

const ProfileEdit = (props: ProductProps & FormikProps<FormValues>) => {
    const { errors, isSubmitting, setFieldValue } = props;

    const getImagesData = async (files: [ImageData]): Promise<void> => {
        if (Object.keys(files).length !== 0) {
            setFieldValue('images', files);
        }
    };

    const cat = ['Roles.user', 'Roles.customer'];
    const CategoryOptions = cat.map((r, key) => (
        <option value={r} key={key}>
            {r}
        </option>
    ));

    return (
        <div className={style.container}>
            <Form>
                <div className={style.columns}>
                    <UploadProductImages getImages={getImagesData} />
                    <h3>Product</h3>
                    <div>
                        <label htmlFor="productName">Product name</label>
                        <TextField className={style.profileUpdate} id="productName" name="productName" placeholder="productName" />
                        <label htmlFor="description">Product description</label>
                        <TextArea label="Product description" name="description" rows="20" placeholder="Once upon a time there was a princess who lived at the top of a glass hill." />
                        <label htmlFor="quantityPerUnit">Quantity Per Unit</label>
                        <TextField className={style.profileUpdate} id="quantityPerUnit" name="quantityPerUnit" placeholder="quantityPerUnit" />
                        <label htmlFor="unitPrice">Price</label>
                        <TextField className={style.profileUpdate} id="unitPrice" name="unitPrice" placeholder="unitPrice" />
                        <label htmlFor="unitsInStock">Units In Stock</label>
                        <TextField className={style.profileUpdate} id="unitsInStock" name="unitsInStock" placeholder="unitsInStock" />
                        <label htmlFor="warehousePlace">Warehouse Place</label>
                        <TextField className={style.profileUpdate} id="warehousePlace" name="warehousePlace" placeholder="warehousePlace" />
                        <SelectField name="categories" as="select" value={'categories'}>
                            <option>Choice Category</option>
                            {CategoryOptions}
                        </SelectField>
                    </div>
                </div>
                <div className={style.columns}>
                    <h3>Specifications</h3>
                    <div>
                        <label htmlFor="maxLoad">MaxLoad</label>
                        <TextField className={style.profileUpdate} id="maxLoad" name="maxLoad" placeholder="maxLoad" />
                        <label htmlFor="Weight">Weight</label>
                        <TextField className={style.profileUpdate} id="weight" placeholder="weight" name="weight" />
                        <label htmlFor="LiftingHeight">Lifting Height</label>
                        <TextField className={style.profileUpdate} id="liftingHeight" name="liftingHeight" placeholder="liftingHeight" />
                        <label htmlFor="capacity">Capacity</label>
                        <TextField className={style.profileUpdate} id="capacity" name="capacity" placeholder="capacity" />
                        <label htmlFor="energySource">Energy Source</label>
                        <TextField className={style.profileUpdate} id="energySource" name="energySource" placeholder="energySource" />
                        <label htmlFor="speed">Speed</label>
                        <TextField className={style.profileUpdate} id="speed" name="speed" placeholder="speed" />
                        <label htmlFor="length">Length</label>
                        <TextField className={style.profileUpdate} id="length" name="length" placeholder="length" />
                        <label htmlFor="productWidth">Product Width</label>
                        <TextField className={style.profileUpdate} id="productWidth" name="productWidth" placeholder="productWidth" />
                        <label htmlFor="productHeight">Product Height</label>
                        <TextField className={style.profileUpdate} id="productHeight" name="productHeight" placeholder="productHeight" />
                    </div>
                </div>

                <div className={style.bottom}>
                    <button className={style.edit} type="submit" disabled={isSubmitting}>
                        Save
                    </button>
                    <div className={style.arrowBack}>
                        <img src={''} alt="" />
                        Go back
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
            productHeight: props.productHeight || ''
        };
    },
    validationSchema: Yup.object().shape({
        capacity: Yup.string(),
        energySource: Yup.string(),
        speed: Yup.number(),
        length: Yup.number(),
        productWidth: Yup.number(),
        productHeight: Yup.number()
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
        <ProductForm dispatch={useAppDispatch()} productName={''} />
    </div>
);

export default AddProduct;
