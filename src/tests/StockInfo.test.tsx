import { render } from '@testing-library/react';
import StockInfo from '../components/StockInfo';

test('renders stock info correctly when stock is provided', () => {
  const stock = {
    symbol: 'AAPL',
    price: 150.0,
    changePercent: 2.5,
  };

  const { getByText } = render(<StockInfo stock={stock} />);

  expect(getByText('AAPL')).toBeInTheDocument();
  expect(getByText('$150.0')).toBeInTheDocument();
  expect(getByText('Change Percent: 2.5%')).toBeInTheDocument();
});

test('renders "No stock selected" when stock is not provided', () => {
  const { getByText } = render(<StockInfo stock={null} />);

  expect(getByText('No stock selected')).toBeInTheDocument();
});
