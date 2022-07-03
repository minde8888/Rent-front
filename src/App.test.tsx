import { render } from '@testing-library/react';
import App from './App';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

describe('<App />', () => {

  test('renders App', () => {
    const { baseElement } = render(<Provider store={store}><BrowserRouter><App /></BrowserRouter></Provider>)
    expect(baseElement).toBeVisible()
  })
})