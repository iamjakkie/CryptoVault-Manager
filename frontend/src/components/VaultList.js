import React, { useState } from 'react';
import VaultRow from './VaultRow';
import Modal from './Modal';
import '../styles/VaultList.css';

function VaultList({ vaults, onModalStateChange }) {
  const [selectedVault, setSelectedVault] = useState(null);

  const handleVaultClick = (vault) => {
    setSelectedVault(vault);
    onModalStateChange(true);
  };

  const handleCloseModal = () => {
    setSelectedVault(null);
    onModalStateChange(false);
  };

  return (
    <>
      {selectedVault && <Modal vault={selectedVault} onClose={handleCloseModal} />}
      <div className="vault-list">
        {vaults.map((vault, index) => (
          <div key={index} className="vault-row" onClick={() => handleVaultClick(vault)}>
            <VaultRow vault={vault} />
          </div>
        ))}
      </div>
    </>
  );
}

export default VaultList;