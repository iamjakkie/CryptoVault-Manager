import React from 'react';
import VaultsList from './components/VaultsList';
import './App.css';

function App() {
  const vaults = [
    {
      title: 'Dual Currency',
      description: 'Maximise yield on your alternative assets while seizing the opportunity to acquire at a discount or sell for a profit.',
    },
    {
      title: 'Fixed Coupon Notes (Pure Options)',
      description: 'Higher yields, securing returns solely from options premiums with strong downside protection.',
    },
    {
      title: 'Fixed Coupon Notes (Bond + Options)',
      description: 'Earn enhanced yields, blending stability and performance for the conservative investor.',
    },
    // Add more vaults as needed
  ];

  return (
    <div className="App">
      <header className="App-header">
        <h1>Crypto Vaults</h1>
        <nav>
          <button><a href="#">Home</a></button>
          <button><a href="#">Portfolio</a></button>
          <button><a href="#">Docs</a></button>
          <button><a href="#">Connect Wallet</a></button>
        </nav>
      </header>
      <main>
        <VaultsList vaults={vaults} />
      </main>
      <footer>
        <p>&copy; 2024 CryptoVault Manager</p>
        <nav>
          <a href="#">Terms of Service</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Careers</a>
        </nav>
      </footer>
    </div>
  );
}

export default App;