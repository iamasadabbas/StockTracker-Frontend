import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const LineChart = ({ data, label }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy(); // Cleanup existing chart before creating a new one
    }

    const ctx = chartRef.current.getContext('2d');
    chartInstance.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: data?.map((_, index) => `Day ${index + 1}`),
        datasets: [{
          label: `Daily ${label}`,
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
              text: `Number of ${label}`
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
      chartInstance.current.destroy(); // Cleanup on unmount
    };
  }, [data, label]); // Add label to dependencies to handle label changes

  return <canvas ref={chartRef} style={{ width: '100%', height: '400px' }} />;
};

export default LineChart;
