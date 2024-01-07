import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import StockSearch from '../components/StockSearch';

test('renders StockSearch component', () => {
  const mockOnSearch = jest.fn();

  render(<StockSearch onSearch={mockOnSearch} />);

  const searchInput = screen.getByPlaceholderText('Search Stock');
  const searchButton = screen.getByText('Search');

  expect(searchInput).toBeInTheDocument();
  expect(searchButton).toBeInTheDocument();
});

test('calls onSearch with correct symbol when form is submitted', () => {
  const mockOnSearch = jest.fn();
  const symbolToSearch = 'AAPL';

  render(<StockSearch onSearch={mockOnSearch} />);

  const searchInput = screen.getByPlaceholderText('Search Stock');
  const searchButton = screen.getByText('Search');

  fireEvent.change(searchInput, { target: { value: symbolToSearch } });
  fireEvent.click(searchButton);

  expect(mockOnSearch).toHaveBeenCalledWith(symbolToSearch);
});
