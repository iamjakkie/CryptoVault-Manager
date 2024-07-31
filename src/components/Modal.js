import React from 'react';
import { Line } from 'react-chartjs-2';
import '../styles/Modal.css';

function Modal({ vault, onClose }) {
  const chartData = {
    labels: Array.from({ length: 50 }, (_, i) => `${Math.floor(i / 12)}:${(i % 12) * 5}`),
    datasets: [
      {
        label: 'Vault Performance',
        data: Array.from({ length: 50 }, () => Math.floor(Math.random() * 100)),
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        pointRadius: 2,
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Time (5-minute intervals)',
        },
      },
      // y: {
      //   title: {
      //     display: true,
      //     text: 'Performance',
      //   },
      // },
    },
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-button" onClick={onClose}>X</button>
        <h2>{vault.title}</h2>
        <p>{vault.description}</p>
        <p>Yield: {vault.yield}</p>
        <p>Deposit Assets: {vault.depositAssets.join(', ')}</p>
        <p>Underlying Assets: {vault.underlyingAssets.join(', ')}</p>
        <p>Product TVL: {vault.productTVL}</p>
        {/* Add more details and connect wallet logic as needed */}
        <div className="chart-container">
          <Line data={chartData} options={chartOptions}/>
        </div>
        <button>Invest Now</button>
        {/* <button>Invest Now</button> */}
      </div>
    </div>
  );
}

export default Modal;