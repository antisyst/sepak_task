import React, { useState, useEffect, useMemo, useCallback } from 'react';
import StockSearch from './StockSearch';
import PopularStocks from './PopularStocks';
import StockChart from './StockChart';
import StockInfo from './StockInfo';
import Tooltip from './Tooltip';
import ErrorBoundary from './ErrorBoundary';
import HistoricalData from './HistoricalData';
import Loader from './Loader';
import { fetchStockData, fetchStockChartData } from '../services/StockService';
import { DashboardProps, Stock, StockChartData } from '../types/StockTypes';

const Dashboard: React.FC<DashboardProps> = () => {
  const [searchedStockSymbol, setSearchedStockSymbol] = useState<string | null>(null);
  const [searchedStockData, setSearchedStockData] = useState<Stock | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [historicalData, setHistoricalData] = useState<StockChartData[]>([]);
  const [showHistoricalData, setShowHistoricalData] = useState(false);

  useEffect(() => {
    const fetchSearchedStockData = async () => {
      if (searchedStockSymbol) {
        try {
          setLoading(true);
  
          const data = await fetchStockData(searchedStockSymbol);
          setSearchedStockData(data);
          setError(null);
  
          if (showHistoricalData) {
            const historyData = await fetchStockChartData(searchedStockSymbol);
            setHistoricalData(historyData);
          }
        } catch (error) {
          console.error('Error fetching searched stock data', error);
          setError('Failed to fetch stock data. Please try again.');
        } finally {
          setLoading(false);
        }
      }
    };
  
    fetchSearchedStockData();
  }, [searchedStockSymbol, showHistoricalData ]);
  

  const handleSearch = useCallback((symbol: string) => {
    setSearchedStockSymbol(symbol);
    setSearchedStockData(null);
    setHistoricalData([]);
    setShowHistoricalData(false);
  }, []);

  const handleToggleHistoricalData = useCallback(() => {
    setShowHistoricalData((prevShow) => !prevShow);
  }, []);

  const memoizedStockChart = useMemo(() => {
    if (searchedStockSymbol) {
      return <StockChart symbol={searchedStockSymbol} historicalData={historicalData} />;
    }
    return null;
  }, [searchedStockSymbol, historicalData]);

  const memoizedHistoricalData = useMemo(() => (
    showHistoricalData && searchedStockSymbol && <HistoricalData symbol={searchedStockSymbol} />
  ), [showHistoricalData, searchedStockSymbol]);

  return (
    <div>
      <h1 className='first_content'>Financial Dashboard</h1>
      <StockSearch onSearch={handleSearch} />
      {loading ? (
        <Loader />
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div>
          {searchedStockSymbol && searchedStockData && (
            <div className='stock_container'>
              <ErrorBoundary>
                <Tooltip id="dashboard-tooltip" content="This is your financial dashboard. Enter a stock symbol to see detailed information.">
                  <div className='stock_card'>
                    <div>{memoizedStockChart}</div>
                    <div>
                      <StockInfo stock={searchedStockData} />
                      <button onClick={handleToggleHistoricalData} className='hist_button'>
                        {showHistoricalData ? 'Hide Historical Data' : 'Show Historical Data'}
                      </button>
                      {memoizedHistoricalData}
                    </div>
                  </div>
                </Tooltip>
              </ErrorBoundary>
            </div>
          )}
          {!searchedStockSymbol && <PopularStocks />}
        </div>
      )}
    </div>
  );
};

export default Dashboard;