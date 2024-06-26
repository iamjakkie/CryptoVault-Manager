import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Loader from './components/Loader';
import VaultTypesList from './components/VaultTypesList';
import VaultList from './components/VaultList';
import Portfolio from './components/Portfolio';
import Docs from './components/Docs';
import BacktestingEngine from './components/BacktestingEngine';
import './App.css';

function App() {
  const vaultTypes = [
    {
      title: 'Dual Static Ratio',
      description: 'Earn high yields with a fixed ratio of assets, providing a stable return.',
      vaults: [
        {
          title: 'ETH/PEPE 70:30',
          description: 'Invest in ETH and PEPE for up to 20.75% APY.',
          yield: 'up to 30.65% APY',
          depositAssets: ['ETH'],
          underlyingAssets: ['ETH', 'PEPE'],
          productTVL: '$1,486,903.08 USD'
        },
        {
          title: 'WBTC/WETH 40:60',
          description: 'Invest in WBTC and WETH for up to 20.75% APY.',
          yield: 'up to 20.75% APY',
          depositAssets: ['ETH'],
          underlyingAssets: ['BTC', 'WETH'],
          productTVL: '$986,903.08 USD'
        }
      ]
    },
    {
      title: 'Dynamic Rebalancing Ratio',
      description: 'Earn high yields with a dynamic ratio of assets, providing a variable return.',
      vaults: [
        {
          title: 'Dynamic ETH/PEPE 50:50',
          description: 'Invest in ETH and PEPE for up to 25.75% APY.',
          yield: 'up to 25.75% APY',
          depositAssets: ['ETH'],
          underlyingAssets: ['ETH', 'PEPE'],
          productTVL: '$17,885.85 USD'
        }
      ]
    }
  ];

  const [filteredVaults, setFilteredVaults] = useState(vaultTypes.flatMap(type => type.vaults));
  const [modalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

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
  if (isLoading) {
    return <Loader />;
  }
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Crypto Vaults</h1>
          <nav>
            <button><Link to="/">Home</Link></button>
            <button><Link to="/portfolio">Portfolio</Link></button>
            <button><Link to="/backtesting">Backtesting Engine</Link></button>
            <button><Link to="/docs">Docs</Link></button>
            {/* <button><a href="#">Connect Wallet</a></button> */}
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
            <Route path="/backtesting" element={<BacktestingEngine vaultTypes={vaultTypes} />}/>
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