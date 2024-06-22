import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import VaultTypesList from './components/VaultTypesList';
import VaultList from './components/VaultList';
import Portfolio from './components/Portfolio';
import Docs from './components/Docs';
import './App.css';

function App() {
  const vaultTypes = [
    {
      title: 'Dual Currency',
      description: 'Maximise yield on your alternative assets while seizing the opportunity to acquire at a discount or sell for a profit.',
      vaults: [
        {
          title: 'Gold Rush',
          description: 'Invest in XAUT and ETH for up to 30.65% APY.',
          yield: 'up to 30.65% APY',
          depositAssets: ['XAUT', 'ETH'],
          underlyingAssets: ['XAUT', 'ETH'],
          productTVL: '$1,486,903.08 USD'
        },
        {
          title: 'Silver Sprint',
          description: 'Invest in XAGT and ETH for up to 20.75% APY.',
          yield: 'up to 20.75% APY',
          depositAssets: ['XAGT', 'ETH'],
          underlyingAssets: ['XAGT', 'ETH'],
          productTVL: '$986,903.08 USD'
        }
      ]
    },
    {
      title: 'Fixed Coupon Notes (Pure Options)',
      description: 'Higher yields, securing returns solely from options premiums with strong downside protection.',
      vaults: [
        {
          title: 'stETH Whale',
          description: 'Invest in wstETH for 12.69% APY.',
          yield: '12.69% APY',
          depositAssets: ['wstETH'],
          underlyingAssets: ['wstETH'],
          productTVL: '$17,885.85 USD'
        },
        {
          title: 'ETH Whale',
          description: 'Invest in ETH for 13.76% APY.',
          yield: '13.76% APY',
          depositAssets: ['ETH'],
          underlyingAssets: ['ETH'],
          productTVL: '$428,484.35 USD'
        }
      ]
    },
    {
      title: 'Fixed Coupon Notes (Bond + Options)',
      description: 'Earn enhanced yields, blending stability and performance for the conservative investor.',
      vaults: [
        {
          title: 'Cruise Control',
          description: 'Invest in BTC and ETH for up to 18.40% APY.',
          yield: 'up to 18.40% APY',
          depositAssets: ['BTC', 'ETH'],
          underlyingAssets: ['BTC', 'ETH'],
          productTVL: '$10,877,849.20 USD'
        }
      ]
    }
  ];

  const [filteredVaults, setFilteredVaults] = useState(vaultTypes.flatMap(type => type.vaults));
  const [modalOpen, setModalOpen] = useState(false);

  const handleFilterChange = (filteredVaults) => {
    setFilteredVaults(filteredVaults);
  };

  const handleModalStateChange = (isOpen) => {
    setModalOpen(isOpen);
    if (isOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
  };

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
            <Route exact path='/' element={
              <>
                <div className={`main-content ${modalOpen ? 'blur' : ''}`}>
                  <VaultTypesList vaultTypes={vaultTypes} onFilterChange={handleFilterChange}/>
                  <VaultList vaults={filteredVaults} onModalStateChange={handleModalStateChange}/>
                </div>
              </>
            }/>
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