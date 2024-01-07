import React, { useEffect, useState } from 'react';
import StockInfo from './StockInfo';
import StockChart from './StockChart';
import { fetchStockData } from '../services/StockService';
import Tooltip from './Tooltip';
import { Stock } from '../types/StockTypes';
import Loader from './Loader';

const popularStocksList = ['AAPL', 'GOOGL', 'AMZN', 'MSFT', 'TSLA', 'AMD', 'NVDA', 'SOFI'];

const PopularStocks: React.FC = () => {
  const [popularStocksData, setPopularStocksData] = useState<Stock[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPopularStocksData = async () => {
      try {
        const stocksData = await Promise.all(popularStocksList.map(fetchStockData));
        setPopularStocksData(stocksData);
      } catch (error) {
        console.error('Error fetching popular stocks data', error);
      } finally {
        setLoading(false);
      }
    };

    if (!localStorage.getItem('searchedStockSymbol')) {
      setLoading(true);
      fetchPopularStocksData();
    }
  }, []);

  if (loading) {
    return <Loader/>;
  }

  return (
    <div>
      {popularStocksData.length > 0 && (
            <Tooltip id="popular-stocks-tooltip" content="These are popular stocks. Click on a stock to see detailed information.">
          <div className='stock_container'>
            {popularStocksData.map((stock) => (
              <div className='stock_card'>
                <StockInfo stock={stock} />
                <StockChart symbol={stock.symbol} />
              </div>
            ))}
          </div>
          </Tooltip>
      )}
    </div>
  );
};

export default PopularStocks;
