import React from 'react';
import { Line, Bar, Pie, Radar, Doughnut } from 'react-chartjs-2';
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

  const pieData = {
    labels: ['BTC', 'ETH', 'USDC'],
    datasets: [
      {
        label: 'Asset Distribution',
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

  const radarData = {
    labels: ['BTC', 'ETH', 'USDC'],
    datasets: [
      {
        label: 'Risk Exposure',
        data: [2, 9, 7],
        backgroundColor: 'rgba(179,181,198,0.2)',
        borderColor: 'rgba(179,181,198,1)',
        pointBackgroundColor: 'rgba(179,181,198,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(179,181,198,1)',
      },
    ],
  };

  const doughnutData = {
    labels: ['BTC', 'ETH', 'USDC'],
    datasets: [
      {
        label: 'Investment Breakdown',
        data: [30, 40, 30],
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
      <div className="chart-row">
        <div className="chart-container">
          <Line data={lineData} />
        </div>
        <div className="chart-container">
          <Bar data={barData} />
        </div>
      </div>
      <div className="chart-row">
        <div className="chart-container">
          <Pie data={pieData} />
        </div>
        <div className="chart-container">
        <Doughnut data={doughnutData} />
        </div>
      </div>
      {/* <div className="chart-row">
        <div className="chart-container">
          <Doughnut data={doughnutData} />
        </div>
      </div> */}
    </div>
  );
};

export default Portfolio;