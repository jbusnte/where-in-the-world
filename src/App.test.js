import { render, screen } from '@testing-library/react';
import App from './App';

test('renders region selection screen', () => {
  render(<App />);
  const headingElement = screen.getByText(/choose a region/i);
  expect(headingElement).toBeInTheDocument();
});

test('renders header with app title', () => {
  render(<App />);
  const titleElement = screen.getByText(/where in the world/i);
  expect(titleElement).toBeInTheDocument();
});
