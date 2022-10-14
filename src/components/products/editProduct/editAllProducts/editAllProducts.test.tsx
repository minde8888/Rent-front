import { act, fireEvent, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { renderWithContext } from '../../../../helpers/renderWithContext.helper';
import { store } from '../../../../redux/store';
import EditAllProducts from './editAllProducts.component';

// import { act, fireEvent, render } from '@testing-library/react';
// import Edit from './profileEdit.component';
// import { Provider } from 'react-redux';
// import { store } from '../../../redux/store';
// import { renderWithContext } from '../../../helpers/renderWithContext.helper';

describe('<EditAllProducts />', () => {
    test('renders', () => {
        const { baseElement } = renderWithContext(<EditAllProducts />);
        expect(baseElement).toBeVisible();
    });

    test('renders edit button', () => {
        // const passToggle = jest.fn();
        const { container } = render(
            <Provider store={store}>
                <EditAllProducts />
            </Provider>
        );
        const button = getByTestId(container, 'btn-how-to-choose-provider');
        fireEvent.click(button);
        // const removeButton = getByRole('button');
        // const mockCallBack = mySpy.fn();
        // const button = shallow(<Button onClick={mockCallBack}>Ok!</Button>);
        // const removeButton = getByRole('button');
        // userEvent.click(removeButton);
        // expect(removeButton).toBeCalledTimes(1);

        // const goBackButton = getByText(/Go back/);
        // expect(goBackButton).toBeVisible();
        // await act(async () => {
        //     fireEvent.click(goBackButton);
        // });
        // expect(passToggle).toHaveBeenCalled();
    });
});
