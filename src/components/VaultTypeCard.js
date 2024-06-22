import React from 'react';
import '../styles/VaultTypeCard.css';

function VaultTypeCard({vaultType} ) {
  return (
    <div className="vault-type-card">
      <h2>{vaultType.title}</h2>
      <p>{vaultType.description}</p>
      <button>Learn more</button>
    </div>
  );
}

export default VaultTypeCard;