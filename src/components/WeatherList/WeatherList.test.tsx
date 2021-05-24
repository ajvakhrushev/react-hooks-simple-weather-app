import React from 'react';
import { render, screen } from '@testing-library/react';
import WeatherList from './WeatherList';

test('renders learn react link', () => {
  render(<WeatherList />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
