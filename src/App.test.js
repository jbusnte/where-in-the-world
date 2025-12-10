import { render, screen } from '@testing-library/react';
import App from './App';

test('renders difficulty selection screen', () => {
  render(<App />);
  const headingElement = screen.getByText(/choose difficulty/i);
  expect(headingElement).toBeInTheDocument();
});

test('renders header with app title', () => {
  render(<App />);
  const titleElement = screen.getByText(/where in the world/i);
  expect(titleElement).toBeInTheDocument();
});

test('renders difficulty options', () => {
  render(<App />);
  expect(screen.getByText(/easy/i)).toBeInTheDocument();
  expect(screen.getByText(/medium/i)).toBeInTheDocument();
  expect(screen.getByText(/hard/i)).toBeInTheDocument();
});
