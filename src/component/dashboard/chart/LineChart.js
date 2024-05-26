import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const LineChart = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: data?.map((_, index) => `Day ${index + 1}`), // Labeling days
        datasets: [{
          label: 'Daily Requests',
          data: data,
          borderColor: 'blue',
          backgroundColor: 'rgba(0, 0, 255, 0.2)',
          borderWidth: 1,
          fill: true,
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Number of Requests'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Day'
            }
          }
        },
        plugins: {
          legend: {
            display: true,
            position: 'top'
          },
        },
        responsive: true,
        maintainAspectRatio: false,
      }
    });

    return () => {
      chart.destroy(); // Cleanup on unmount
    };
  }, [data]);

  return <canvas ref={chartRef} style={{ width: '100%', height: '400px' }} />;
};

export default LineChart;
