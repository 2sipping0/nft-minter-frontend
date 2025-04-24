import React, { useState } from 'react';
import './App.css';
import Connect from './components/connect';
import MintNFT from './components/MintNFT';

function App() {
  const [account, setAccount] = useState('');
  const contractAddress = '0xe7f1725e7734ce288f8367e1bb143e90bb3f0512';

  return (
    <div className="App">
      <header className="App-header">
        <h1>NFT Minter</h1>
        <Connect setAccount={setAccount} />
        {account && (
          <MintNFT 
            account={account} 
            contractAddress={contractAddress} 
          />
        )}
      </header>
    </div>
  );
}

export default App;