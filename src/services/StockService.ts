import axios from 'axios';
import { Stock, StockChartData } from '../types/StockTypes';

const IEX_CLOUD_API_KEY = 'sk_bdfca8b2db0f4afbb7be0193b92a4f65';
const BASE_URL = 'https://cloud.iexapis.com/stable';

interface IEXChartDataPoint {
  date: string;
  close: number;
}

export const fetchStockData = async (symbol: string): Promise<Stock> => {
  try {
    const response = await axios.get(
      `${BASE_URL}/stock/${symbol}/quote?token=${IEX_CLOUD_API_KEY}`
    );

    return {
      symbol: response.data.symbol,
      price: response.data.latestPrice,
      changePercent: response.data.changePercent,
    };
  } catch (error) {
    console.error('Failed to fetch stock data', error);
    throw new Error('Failed to fetch stock data');
  }
};

export const fetchStockChartData = async (symbol: string): Promise<StockChartData[]> => {
  try {
    const response = await axios.get<IEXChartDataPoint[]>(
      `${BASE_URL}/stock/${symbol}/chart/1m?token=${IEX_CLOUD_API_KEY}`
    );

    const chartData: StockChartData[] = response.data.map((point) => ({
      date: point.date,
      value: point.close,
    }));

    return chartData;
  } catch (error) {
    console.error('Failed to fetch stock chart data', error);
    throw new Error('Failed to fetch stock chart data');
  }
};
