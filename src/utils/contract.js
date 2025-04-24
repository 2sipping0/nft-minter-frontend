import { ethers } from 'ethers';
import BasicNFTMinter from '../abis/BasicNFTMinter.json';

export const getContract = async (address) => {
  try {
    const { ethereum } = window;
    
    if (ethereum) {
      // Create provider using the newer syntax
      const provider = new ethers.BrowserProvider(ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        address,
        BasicNFTMinter.abi,
        signer
      );
      
      return contract;
    }
  } catch (error) {
    console.log('Error getting contract', error);
    return null;
  }
};