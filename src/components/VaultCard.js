import React from 'react';
import '../styles/VaultCard.css';

function VaultCard({ vault }) {
  return (
    <div className="vault-card">
      <h2>{vault.title}</h2>
      <p>{vault.description}</p>
      <button>Learn more</button>
    </div>
  );
}

export default VaultCard;