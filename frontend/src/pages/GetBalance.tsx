import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

export function ShowSolBalance() {
  const { connection } = useConnection();
  const wallet = useWallet();


  async function getBalance() {
    
    if (wallet.publicKey) {
      const balance = await connection.getBalance(wallet.publicKey);
      const balanceElement = document.getElementById("balance");
      if (balanceElement) {
        balanceElement.innerHTML = (balance / LAMPORTS_PER_SOL).toString();
        
      }
    }
  }

  getBalance();

  return (
    <div >
        Your Balance Corrsponding to the connected wallet is {'->'} <span id = "balance"></span>
    </div>
  );
  
  
}