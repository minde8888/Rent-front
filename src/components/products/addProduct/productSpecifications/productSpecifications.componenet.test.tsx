import { render } from '@testing-library/react';
import { FormikProvider } from 'formik';
import ProductSpecifications from './productSpecifications.component';

describe('<ProductSpecifications />', () => {
    xtest('renders', () => {
        const component = render(<ProductSpecifications />);
    });
});
