import React from 'react';
import { StockInfoProps } from '../types/StockTypes';

const StockInfo: React.FC<StockInfoProps> = ({ stock }) => {
  return (
    <div className='chart_info'>
      {stock ? (
        <div>
          <h2>{stock.symbol}</h2>
          <p>${stock.price}</p>
          <p className='change_percent'>Change Percent: <span>{stock.changePercent}%</span></p>
        </div>
      ) : (
        <p>No stock selected</p>
      )}
    </div>
  );
};

export default StockInfo;
