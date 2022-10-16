import { Provider } from 'react-redux';
import { BrowserRouter, MemoryRouter, Route } from 'react-router-dom';
import { store } from '../redux/store';
import { render } from '@testing-library/react';

export function renderBrowserWithContext(element: React.ReactElement) {
    return render(
        <BrowserRouter>
            <Provider store={store}>{element}</Provider>
        </BrowserRouter>
    );
}

export function renderWithContext(element: React.ReactElement) {
    return render(<Provider store={store}>{element}</Provider>);
}

export function renderMemoryRouterWithContext(route: string, element: React.ReactElement) {
    return render(
        <MemoryRouter initialEntries={[route]}>
            <Provider store={store}>
                {element}
            </Provider>
        </MemoryRouter>
    );
}

