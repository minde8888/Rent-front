import { fireEvent } from '@testing-library/react';
import { renderWithContext } from '../../helpers/renderWithContext.helper';
import { getProducts } from '../../redux/slice/productsSlice';
import { store } from '../../redux/store';
import { response } from '../products/variables/variables';
import Pagination from './pagination.component';

describe('<Pagination />', () => {
    const setup = () => {
        store.dispatch(getProducts(response));
        const utils = renderWithContext(<Pagination firstPage={2} lastPage={0} nextPage={3} previousPage={1} pageNumber={2} pageSize={10} totalPages={3} totalRecords={30} />);
        return {
            ...utils
        };
    };
    test('renders', () => {
        const { baseElement } = setup();
        expect(baseElement).toBeVisible();
    });
    test('pagination buttons', () => {
        const { getAllByRole } = setup();
        const buttons = getAllByRole('button');
        expect(buttons[0]).toBeVisible;
        expect(buttons[1]).toBeVisible;
        expect(buttons[2]).toBeVisible;
        expect(buttons[3]).toBeVisible;
        expect(buttons[4]).toBeVisible;
    });
});
