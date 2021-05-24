import React from 'react';
import { render, screen } from '@testing-library/react';
import WeatherItem from './WeatherItem';

test('renders learn react link', () => {
  render(<WeatherItem />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
