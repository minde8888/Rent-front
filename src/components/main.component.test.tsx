import { act } from '@testing-library/react';
import '@testing-library/jest-dom';
import Main from './main.component';
import { renderMemoryRouterWithContext } from '../helpers/renderWithContext.helper';

describe('<Main />', () => {
    const setup = async (route = '') => {
        const utils = renderMemoryRouterWithContext(route, <Main />);
        return {
            ...utils
        };
    };

    test('renders', async () => {
        const { baseElement } = await setup();
        act(() => {
            expect(baseElement).toBeVisible();
        });
    });
});
