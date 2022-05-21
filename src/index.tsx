import React from 'react';
import App from './App';
import {store} from './redux/store'
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import * as ReactDOMClient from 'react-dom/client';

let root = ReactDOMClient.createRoot(document.getElementById('root') as HTMLElement);


root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);