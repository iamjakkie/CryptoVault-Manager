import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import VaultTypesList from './components/VaultTypesList';
import Portfolio from './components/Portfolio';
import Docs from './components/Docs';
import './App.css';

function App() {
  const vaultTypes = [
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
    <Router>
    <div className="App">
      <header className="App-header">
        <h1>Crypto Vaults</h1>
        <nav>
          <button><Link to="/">Home</Link></button>
          <button><Link to="/portfolio">Portfolio</Link></button>
          <button><Link to="/docs">Docs</Link></button>
          <button><a href="#">Connect Wallet</a></button>
        </nav>
      </header>
      <main>
        <Routes>
          <Route exact path='/' element={<VaultTypesList vaultTypes={vaultTypes}/>}/>
          <Route path="/portfolio" element={<Portfolio />}/>
          <Route path="/docs" element={<Docs />}/>
        </Routes>
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
    </Router>
  );
}

export default App;