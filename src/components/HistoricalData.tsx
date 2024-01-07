import React, { useEffect, useState } from 'react';
import { fetchStockChartData } from '../services/StockService';
import { StockChartData } from '../types/StockTypes';

interface HistoricalDataProps {
  symbol: string;
}

const HistoricalData: React.FC<HistoricalDataProps> = ({ symbol }) => {
  const [historicalData, setHistoricalData] = useState<StockChartData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistoricalData = async () => {
      try {
        setLoading(true);
        const data = await fetchStockChartData(symbol);
        setHistoricalData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching historical data', error);
        setLoading(false);
      }
    };

    fetchHistoricalData();
  }, [symbol]);

  return (
    <div className='historical_section'>
      {loading ? (
        <p>Loading historical data...</p>
      ) : (
        <div className='historical_container'>
          {historicalData.map((data, index) => (
            <div key={index}>
              <p>Date: <span>{data.date}</span></p>
              {data.volume && <p>Volume: <span>{data.volume}</span></p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoricalData;
