import React, { useState } from 'react';
import VaultRow from './VaultRow';
import Modal from './Modal';
import '../styles/VaultList.css';


function VaultList({ vaults }) {
  const [selectedVault, setSelectedVault] = useState(null);

  const handleVaultClick = (vault) => {
    setSelectedVault(vault);
  };

  const handleCloseModal = () => {
    setSelectedVault(null);
  };

  return (
    <div className="vault-list">
      {vaults.map((vault, index) => (
        <div key={index} className="vault-row" onClick={() => handleVaultClick(vault)}>
          <VaultRow vault={vault} />
        </div>
      ))}
      {selectedVault && <Modal vault={selectedVault} onClose={handleCloseModal} />}
    </div>
  );
}

export default VaultList;