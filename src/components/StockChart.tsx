import React, { useEffect, useState } from 'react';
import ApexCharts from 'react-apexcharts';
import { fetchStockChartData } from '../services/StockService';
import { StockChartProps, StockChartData } from '../types/StockTypes';
import { ApexOptions } from 'apexcharts';

const StockChart: React.FC<StockChartProps> = ({ symbol, historicalData }) => {
  const [chartData, setChartData] = useState<StockChartData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        setLoading(true);

        if (historicalData && historicalData.length > 0) {
          setChartData(historicalData);
        } else {
          const data = await fetchStockChartData(symbol);
          setChartData(data);
        }

        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchChartData();
  }, [symbol, historicalData]);

  const options: ApexOptions = {
    chart: {
      type: 'line',
      toolbar: {
        show: false,
      },
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150,
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350,
        },
      },
    },
    xaxis: {
      type: 'datetime',
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
    },
    grid: {
      show: false,
    },
    tooltip: {
      x: {
        show: false,
      },
      y: {
        formatter: (val: number) => `$${val.toFixed(2)}`,
      },
    },
    colors: ['#0072f5'],
    stroke: {
      width: 3,
    },
    fill: {
      colors: ['#0072f5'],
    },
    markers: {},
    states: {
      hover: {
        filter: {
          type: 'lighten',
          value: 0.02,
        },
      },
    },
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
  };

  return (
    <div>
      {loading ? (
        <p>Loading chart data...</p>
      ) : (
        <ApexCharts
          options={options}
          series={[
            {
              name: symbol,
              data: chartData.map((point) => [new Date(point.date).getTime(), point.value]),
            },
          ]}
          type="line"
          className='chart_item'
        />
      )}
    </div>
  );
};

export default StockChart;
