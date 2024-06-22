import React, { useState } from 'react';
import VaultTypeCard from './VaultTypeCard';
import '../styles/VaultTypesList.css';

function VaultTypesList({ vaultTypes, onFilterChange }) {
  const [selectedTypes, setSelectedTypes] = useState([]);

  const handleTypeClick = (vaultType, event) => {
    let updatedSelectedTypes = [...selectedTypes];

    if (event.shiftKey) {
      if (selectedTypes.includes(vaultType.title)) {
        updatedSelectedTypes = updatedSelectedTypes.filter(type => type !== vaultType.title);
      } else {
        updatedSelectedTypes.push(vaultType.title);
      }
    } else {
      if (selectedTypes.includes(vaultType.title)) {
        updatedSelectedTypes = [];
      } else {
        updatedSelectedTypes = [vaultType.title];
      }
    }

    setSelectedTypes(updatedSelectedTypes);

    if (updatedSelectedTypes.length > 0) {
      const filteredVaults = vaultTypes
        .filter(type => updatedSelectedTypes.includes(type.title))
        .flatMap(type => type.vaults);
      onFilterChange(filteredVaults);
    } else {
      onFilterChange(vaultTypes.flatMap(type => type.vaults));
    }
  };

  return (
    <div className="vault-types-list">
      {vaultTypes.map((vaultType, index) => (
        <div
          key={index}
          onClick={(event) => handleTypeClick(vaultType, event)}
          className={`vault-type-card-container ${selectedTypes.includes(vaultType.title) ? 'selected' : ''}`}
        >
          <VaultTypeCard vaultType={vaultType} />
        </div>
      ))}
    </div>
  );
}

export default VaultTypesList;