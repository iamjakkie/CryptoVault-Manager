import React, { useState } from 'react';
import '../styles/BacktestingEngine.css';

const BacktestingEngine = ({ vaultTypes }) => {
  const [selectedVault, setSelectedVault] = useState(null);
  const [customToken1, setCustomToken1] = useState('');
  const [customToken2, setCustomToken2] = useState('');
  const [ratio, setRatio] = useState('');
  const [fee, setFee] = useState('');
  const [report, setReport] = useState(null);

  const handleVaultChange = (e) => {
    setSelectedVault(e.target.value);
  };

  const handleGenerateReport = () => {
    // Logic for generating a backtesting report
    // This could involve calling an API or running some backtesting logic
    const newReport = `Report for ${selectedVault} with ${customToken1} and ${customToken2} at ${ratio} ratio. Fee: ${fee}`;
    setReport(newReport);
  };

  return (
    <div className="backtesting-engine">
      <h2>Backtesting Engine</h2>
      <div className="form-group">
        <label htmlFor="vault-select">Select Existing Vault:</label>
        <select id="vault-select" onChange={handleVaultChange}>
          <option value="">Select Vault</option>
          {vaultTypes.flatMap(type => type.vaults).map((vault, index) => (
            <option key={index} value={vault.title}>{vault.title}</option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="custom-token1">Custom Token 1:</label>
        <input
          type="text"
          id="custom-token1"
          value={customToken1}
          onChange={(e) => setCustomToken1(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="custom-token2">Custom Token 2:</label>
        <input
          type="text"
          id="custom-token2"
          value={customToken2}
          onChange={(e) => setCustomToken2(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="ratio">Ratio (e.g., 50:50):</label>
        <input
          type="text"
          id="ratio"
          value={ratio}
          onChange={(e) => setRatio(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="fee">Fee:</label>
        <input
          type="text"
          id="fee"
          value={fee}
          onChange={(e) => setFee(e.target.value)}
        />
      </div>
      <button onClick={handleGenerateReport}>Generate Backtesting Report</button>
      {report && (
        <div className="report">
          <h3>Backtesting Report</h3>
          <p>{report}</p>
        </div>
      )}
    </div>
  );
};

export default BacktestingEngine;