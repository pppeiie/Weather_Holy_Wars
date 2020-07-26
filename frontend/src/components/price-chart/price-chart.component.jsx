import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import Chart from 'react-apexcharts';

import { PriceChartContainer } from './price-chart.styles';

const PriceChart = () => {
  const initialOptions = {
    chart: {
      id: 'price-chart',
      zoom: {
        type: 'x',
        enabled: true
      }
    },
    colors: ['#77B6EA'],
    dataLabels: {
      enabled: true
    },
    tooltip: {
      x: {
        show: true,
        format: "yy' MMM dd - HH:mm:ss"
      },
      y: {
        title: {
          formatter: seriesName => `${seriesName} $`
        }
      }
    },
    stroke: {
      curve: 'smooth'
    },
    title: {
      text: '',
      align: 'center',
      style: {
        fontSize: '20px',
        color: '#2471A3'
      }
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        colorStops: [
          {
            offset: 0,
            color: '#77B6EA',
            opacity: 1
          },
          {
            offset: 90,
            color: '#EB656F', // #545454
            opacity: 1
          }
        ]
      }
    },
    xaxis: {
      categories: [],
      type: 'datetime',
      labels: {
        format: "MMM 'dd HH:mm:ss"
      },
      title: {
        style: {
          color: '#148F77',
          fontSize: '18px'
        }
      }
    },
    yaxis: {
      decimalsInFloat: 2,
      title: {
        style: {
          color: '#148F77',
          fontSize: '18px'
        }
      },
      tickAmount: 5
    }
  };

  const [options, setOptions] = useState(initialOptions);
  const [series, setSeries] = useState([]);

  const history = useSelector(state => state.wallet.history);

  useEffect(() => {
    setOptions(options => ({
      ...options,
      xaxis: {
        categories: history.map(item => item.latestTime)
      }
    }));

    setSeries([{ name: 'BTC / USD', data: history.map(item => item.latestPrice) }]);
  }, [history]);

  return (
    <PriceChartContainer>
      <Chart options={options} series={series} type='line' width='100%' />
    </PriceChartContainer>
  );
};

export default PriceChart;
