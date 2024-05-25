import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AppFunctional from './AppFunctional';
import '@testing-library/jest-dom/extend-expect';

test('sanity', () => {
  expect(true).toBe(true);
});

test('renders the grid and controls', () => {
  render(<AppFunctional />);
  expect(screen.getByText(/Coordinates/)).toBeInTheDocument();
  expect(screen.getByText(/You moved/)).toBeInTheDocument();
  expect(screen.getByText(/LEFT/)).toBeInTheDocument();
  expect(screen.getByText(/UP/)).toBeInTheDocument();
  expect(screen.getByText(/RIGHT/)).toBeInTheDocument();
  expect(screen.getByText(/DOWN/)).toBeInTheDocument();
  expect(screen.getByText(/reset/)).toBeInTheDocument();
});

test('updates email input value', () => {
  render(<AppFunctional />);
  const input = screen.getByPlaceholderText(/type email/i);
  fireEvent.change(input, { target: { value: 'test@example.com' } });
  expect(input.value).toBe('test@example.com');
});

test('moves the "B" up', () => {
  render(<AppFunctional />);
  const upButton = screen.getByText(/UP/i);
  fireEvent.click(upButton);
  const coordinates = screen.getByText(/Coordinates/);
  expect(coordinates).toHaveTextContent('Coordinates (2, 1)');
});

test('moves the "B" down', () => {
  render(<AppFunctional />);
  const downButton = screen.getByText(/DOWN/i);
  fireEvent.click(downButton);
  const coordinates = screen.getByText(/Coordinates/);
  expect(coordinates).toHaveTextContent('Coordinates (2, 3)');
});

test('moves the "B" left', () => {
  render(<AppFunctional />);
  const leftButton = screen.getByText(/LEFT/i);
  fireEvent.click(leftButton);
  const coordinates = screen.getByText(/Coordinates/);
  expect(coordinates).toHaveTextContent('Coordinates (1, 2)');
});

test('moves the "B" right', () => {
  render(<AppFunctional />);
  const rightButton = screen.getByText(/RIGHT/i);
  fireEvent.click(rightButton);
  const coordinates = screen.getByText(/Coordinates/);
  expect(coordinates).toHaveTextContent('Coordinates (3, 2)');
});

test('resets the grid', () => {
  render(<AppFunctional />);
  const resetButton = screen.getByText(/reset/i);
  fireEvent.click(resetButton);
  const coordinates = screen.getByText(/Coordinates/);
  expect(coordinates).toHaveTextContent('Coordinates (2, 2)');
  const steps = screen.getByText(/You moved/);
  expect(steps).toHaveTextContent('You moved 0 times');
});

test('submits the form and displays a message', async () => {
  render(<AppFunctional />);
  const input = screen.getByPlaceholderText(/type email/i);
  const submitButton = screen.getByRole('button', { name: /submit/i });

  fireEvent.change(input, { target: { value: 'test@example.com' } });
  fireEvent.click(submitButton);

  // Wait for the response to come back
  await waitFor(() => expect(screen.getByText(/You moved/)).toBeInTheDocument());
});
