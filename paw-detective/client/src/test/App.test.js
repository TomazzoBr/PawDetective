import { render, screen } from '@testing-library/react';
import App from '../App';
// import mount

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/test/i);
  expect(linkElement).toBeInTheDocument();
});
