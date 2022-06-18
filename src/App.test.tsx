import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

xtest('renders the App', () => {
  const { asFragment } = render(<App />);
  expect(asFragment()).toMatchSnapshot();
  // render(<App />);
  // const linkElement = screen.getByText(/learn react/i);
  // expect(linkElement).toBeInTheDocument();
});
