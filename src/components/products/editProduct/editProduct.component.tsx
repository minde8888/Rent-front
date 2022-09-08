import { Form, Formik } from 'formik';
import { useCallback, useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux.hooks';
import { getOneProduct } from '../../../redux/slice/productSlice';
import { getProduct } from '../../../services/products.services/products.services';
import * as Yup from 'yup';
import { TextField } from '../../validation/textField';
import { TextArea } from '../../validation/textArea';

interface FormValues {
    place: string;
    price: string;
    productCode: string;
    size: string;
    productName: string;
    content: string;
}

interface Props {
    onSubmit: (values: FormValues) => Promise<void>;
    place: string;
    price: string;
    size: string;
    productCode: string;
    productName: string;
    content: string;
}

export const InnerForm = (props: Props) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { isLoggedIn, error } = useAppSelector((state) => state.data.auth);

    const handleSubmit = useCallback(
        async (values: FormValues) => {
            setIsSubmitting(true);
            await props.onSubmit(values);
            setIsSubmitting(false);
        },
        [props.onSubmit]
    );

    return (
        <Formik
            initialValues={{
                place: '',
                price: '',
                productCode: '',
                size: '',
                productName: '',
                content: ''
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
                <TextField label="Place" name="place" type="place" />
                <TextField label="Price" name="price" type="price" />
                <TextField label="ProductCode" name="productCode" type="productCode" />
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

const EditProduct: React.FC = () => {
    const { id } = useParams();
    const dispatch = useAppDispatch();

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
        console.log(id);
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
                onSubmit={handleSubmit}
                place={product.$values[0].place}
                price={product.$values[0].price}
                size={product.$values[0].size}
                productCode={product.$values[0].productCode}
                productName={product.$values[0].postsDto.productName}
                content={product.$values[0].postsDto.content}
            />
        </div>
    );
};

export default EditProduct;
