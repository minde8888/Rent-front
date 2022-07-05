import { act, fireEvent, render } from '@testing-library/react';
import ProductDescription from './productDescription.component';
// import * as formik from 'formik';
import { FormikProvider, useFormik } from 'formik';

describe('<ProductDescription />', () => {
    xtest('renders', async () => {
        const component = render(
            <FormikProvider value={formik}>
                <ProductDescription productName={''} />
            </FormikProvider>
        );
    });
});
