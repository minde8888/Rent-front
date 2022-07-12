import { ComponentProps } from 'react';
import { act, fireEvent, render } from '@testing-library/react';
import ProductDescription from './productDescription.component';
import { FormikProvider, useFormik } from 'formik';

const setup = (properties: ComponentProps<typeof ProductDescription>) => {
    const Wrapper = () => {
        const formik = useFormik({
            onSubmit: jest.fn(),
            initialValues: {
                productName: 'product description test'
            }
        });

        return (
            <FormikProvider value={formik}>
                <ProductDescription {...properties} />
            </FormikProvider>
        );
    };

    return render(<Wrapper />);
};

describe('<ProductDescription />', () => {
    test('renders', async () => {
        setup({ productName: 'description' });
    });
});
