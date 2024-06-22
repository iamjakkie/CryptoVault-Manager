import React from 'react';
import VaultTypeCard from './VaultTypeCard';
import '../styles/VaultTypesList.css';

function VaultTypesList({ vaultTypes }) {
  return (
    <div className="vault-types-list">
      {vaultTypes.map((vaultType, index) => (
        <VaultTypeCard key={index} vaultType={vaultType} />
      ))}
    </div>
  );
}

export default VaultTypesList;