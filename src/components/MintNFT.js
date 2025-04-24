import React, { useState } from 'react';
import { getContract } from '../utils/contract';

function MintNFT({ account, contractAddress }) {
  const [tokenURI, setTokenURI] = useState('');
  const [mintingStatus, setMintingStatus] = useState('');
  
  const mintNFT = async () => {
    if (!account || !tokenURI) return;
    
    try {
      setMintingStatus('Minting...');
      const contract = await getContract(contractAddress);
      
      // Check if minting fee is enabled
      const mintingFeeEnabled = await contract.mintingFeeEnabled();
      const mintingFee = await contract.mintingFee();
      
      let tx;
      if (mintingFeeEnabled) {
        tx = await contract.selfMint(tokenURI, { value: mintingFee });
      } else {
        tx = await contract.selfMint(tokenURI);
      }
      
      await tx.wait();
      setMintingStatus('NFT minted successfully!');
      setTokenURI('');
    } catch (error) {
      console.log('Error minting NFT:', error);
      setMintingStatus('Error minting NFT');
    }
  };

  return (
    <div>
      <h2>Mint a New NFT</h2>
      <p>Token URI (IPFS or other storage link):</p>
      <input 
        type="text" 
        value={tokenURI} 
        onChange={(e) => setTokenURI(e.target.value)} 
        placeholder="ipfs://..." 
      />
      <button onClick={mintNFT} disabled={!account || !tokenURI}>
        Mint NFT
      </button>
      {mintingStatus && <p>{mintingStatus}</p>}
    </div>
  );
}

export default MintNFT;