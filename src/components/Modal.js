import React from 'react';
import '../styles/Modal.css';

function Modal({ vault, onClose }) {
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
        <button>Invest Now</button>
      </div>
    </div>
  );
}

export default Modal;