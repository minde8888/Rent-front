import { fireEvent } from '@testing-library/react';
import { ReactNode } from 'react';
import { renderBrowserWithContext } from '../../helpers/renderWithContext.helper';
import Modal from './modal.component';

const Component = () => {
    return <div>test-modal</div>;
};
const Html: ReactNode = Component();

describe('<Products />', () => {
    const setup = (open: boolean, html: ReactNode) => {
        const mock = jest.fn();
        const utils = renderBrowserWithContext(<Modal isOpen={open} toggle={mock} children={html} />);
        return { ...utils, mock };
    };

    test('renders', () => {
        const Html: ReactNode = Component();
        const { baseElement } = setup(true, Html);
        expect(baseElement).toBeVisible();
    });

    test('Toggle button, visible', () => {
        const { mock, getByTestId, getByText } = setup(true, Html);
        const closeBtn = getByTestId('test-toggle-id');
        const visible = getByText('test-modal');
        expect(visible).toBeVisible();
        fireEvent.click(closeBtn);
        expect(mock).toHaveBeenCalled();
    });
});
