import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import '../styles/Modal.css';

function Modal({ vault, onClose }) {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Vault Performance',
        data: [],
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        pointRadius: 2,
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5001/vaults/1/share_price');
        const data = await response.json();

        // const labels = data.map(item => new Date(item.timestamp * 1000).toLocaleTimeString());
        // label is in the format YYYY-MM-DDTHH:MM:SS.000Z -> convert it to HH:MM
        const labels = data.map(item => new Date(item.datetime).toLocaleTimeString());
        const chartValues = data.map(item => item.price);

        setChartData({
          labels,
          datasets: [
            {
              ...chartData.datasets[0],
              data: chartValues,
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

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