import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import '../styles/Portfolio.css';

const Portfolio = () => {
  const lineData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Portfolio Value',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  const barData = {
    labels: ['BTC', 'ETH', 'USDC'],
    datasets: [
      {
        label: 'Asset Allocation',
        data: [12, 19, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="portfolio">
      <h2>Portfolio Overview</h2>
      <div className="chart-container">
        <Line data={lineData} />
      </div>
      <div className="chart-container">
        <Bar data={barData} />
      </div>
    </div>
  );
};

export default Portfolio;