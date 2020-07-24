import React, { useState, useEffect } from 'react';

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
        format: "MMM 'dd HH:mm"
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

  useEffect(() => {
    const sampleTimes = [
      '2018-09-19T00:00:00.000Z',
      '2018-09-19T01:30:00.000Z',
      '2018-09-19T02:30:00.000Z',
      '2018-09-19T03:30:00.000Z',
      '2018-09-19T04:30:00.000Z',
      '2018-09-19T05:30:00.000Z',
      '2018-09-19T06:30:00.000Z'
    ];

    const samplePrices = [
      {
        name: 'ETH / USD',
        data: [237.4, 238.6, 235.9, 240.1, 237.2, 234.6, 235.8]
      }
    ];

    setOptions(options => ({
      ...options,
      xaxis: {
        categories: sampleTimes
      }
    }));
    setSeries(samplePrices);
  }, []);

  return (
    <PriceChartContainer>
      <Chart options={options} series={series} type='line' width='100%' />
    </PriceChartContainer>
  );
};

export default PriceChart;
