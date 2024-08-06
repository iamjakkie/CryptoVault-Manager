import React from 'react';
import '../styles/VaultTypeCard.css';

function VaultTypeCard({ vaultType }) {
  return (
    <div className="vault-type-card">
      <h2 className="vault-type-title">{vaultType.title}</h2>
      <p>{vaultType.description}</p>
    </div>
  );
}

export default VaultTypeCard;