import React from 'react';
import VaultCard from './VaultCard';
import '../styles/VaultsList.css';

function VaultsList({ vaults }) {
  return (
    <div className="vaults-list">
      {vaults.map((vault, index) => (
        <VaultCard key={index} vault={vault} />
      ))}
    </div>
  );
}

export default VaultsList;