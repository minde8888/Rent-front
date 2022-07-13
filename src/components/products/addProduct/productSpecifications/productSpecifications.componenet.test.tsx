import { render } from '@testing-library/react';
import { FormikProvider, useFormik } from 'formik';
import { ComponentProps } from 'react';
import ProductSpecifications from './productSpecifications.component';

const setup = (properties: ComponentProps<typeof ProductSpecifications>) => {
    const Wrapper = () => {
        const formik = useFormik({
            onSubmit: jest.fn(),
            initialValues: {
                productName: 'product specifications test'
            }
        });
        return (
            <FormikProvider value={formik}>
                <ProductSpecifications />
            </FormikProvider>
        );
    };

    return render(<Wrapper />);
};

describe('<ProductSpecifications />', () => {
    test('renders', async () => {
        setup({ productName: 'specifications' });
    });
});
