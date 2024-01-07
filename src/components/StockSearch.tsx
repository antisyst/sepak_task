import React, { useState } from 'react';
import { StockSearchProps } from '../types/StockTypes';
import { IoSearchOutline } from "react-icons/io5";

const StockSearch: React.FC<StockSearchProps> = ({ onSearch }) => {
  const [symbol, setSymbol] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(symbol);
  };

  return (
    <form onSubmit={handleSubmit} className='search_field'>
      <input
        type="text"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value)}
        placeholder="Search Stock"
      />
      <button type="submit"><IoSearchOutline/></button>
    </form>
  );
};

export default StockSearch;
