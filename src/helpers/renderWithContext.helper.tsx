import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from '../redux/store';
import { render } from '@testing-library/react';

export function renderBrowserWithContext(element: React.ReactElement) {
    render(
        <BrowserRouter>
            <Provider store={store}>{element}</Provider>
        </BrowserRouter>
    );
}

export function renderWithContext(element: React.ReactElement) {
    render(<Provider store={store}>{element}</Provider>);
}
