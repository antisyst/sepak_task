export interface Stock {
  symbol: string;
  price: number;
  changePercent: number;
}

export interface StockChartData {
  date: string;
  value: number;
  companyName?: string;
  latestTime?: string; 
  open?: string; 
  high?: string;
  low?: string;
  close?: string;
  volume?: string;
}

export interface StockInfoProps {
  stock: Stock | null; 
}

export interface StockChartProps {
  symbol: string;
  historicalData?: StockChartData[];
}

export interface StockSearchProps {
  onSearch: (symbol: string) => void;
}

export interface DashboardProps {
  //
}
