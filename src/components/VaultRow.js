import React from 'react';
import '../styles/VaultRow.css';

function VaultRow({ vault }) {
  return (
    <div className="vault-row">
      <div className="vault-row-content">
        <div className="vault-info">
          <h3>{vault.title}</h3>
          <p>{vault.description}</p>
        </div>
        <div className="vault-details">
          <span>Yield: {vault.yield}</span>
          <span>Deposit Assets: {vault.depositAssets.join(', ')}</span>
          <span>Underlying Assets: {vault.underlyingAssets.join(', ')}</span>
          <span>Product TVL: {vault.productTVL}</span>
        </div>
      </div>
    </div>
  );
}

export default VaultRow;