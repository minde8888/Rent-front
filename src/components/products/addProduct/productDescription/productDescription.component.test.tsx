import { ComponentProps } from 'react';
import { render } from '@testing-library/react';
import ProductDescription from './productDescription.component';
import { FormikProvider, useFormik } from 'formik';
import userEvent from '@testing-library/user-event';

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
        const { getByPlaceholderText, findByDisplayValue } = setup({ productName: 'description', uniqueCat: [] });
        const field = getByPlaceholderText('Email');
        const field_1 = getByPlaceholderText('Place');
        const user = userEvent.setup();
        await user.type(field, "test@test.com");
        await user.click(field_1);
        const sameField = await findByDisplayValue("test@test.com");
    });
});
