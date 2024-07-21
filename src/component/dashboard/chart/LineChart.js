import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { positions } from 'react-alert';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChart = ({ data, label, labels }) => {
  const getChartData = () => {
    return {
      labels: labels,
      datasets: [
        {
          label: label,
          data: data,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    };
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top', // Move the legend to the right side
      },
      title: {
        display: true,
        text: 'Registration Request',
        position:'left' // Add a chart title
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            if (Number.isInteger(value) && value >= 0) {
              return value;
            }
          },
        },
        min: 0,
      },
    },
  };

  return (
    <div style={{ position: 'relative' }}>
      <Line data={getChartData()} options={options} />
    </div>
  );
};

export default LineChart;
