import { useState } from 'react';
import './App.css';
import { SolanaWallet } from './pages/SolanaWallet.tsx';
import { Button } from './components/ui/button.tsx';
import { Mnemonics } from './helpers/Mnemonics.tsx';


import { ConnectionProvider, WalletProvider, } from "@solana/wallet-adapter-react";
// import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { WalletModalProvider, WalletDisconnectButton, WalletMultiButton, } from "@solana/wallet-adapter-react-ui";
// import { clusterApiUrl } from "@solana/web3.js";
import "@solana/wallet-adapter-react-ui/styles.css";
import { useWallet } from "@solana/wallet-adapter-react";

function App() {
    const [mnemonic, setMnemonic] = useState<string[]>([]);
    const [mneuRaw, setMneuRaw] = useState<string>("");
     const [publicKeys, setPublicKeys] = useState<string[]>([]); // Store public keys for resetting
    const [privateKeys, setPrivateKeys] = useState<string[]>([]); // Store private keys for resetting
    const [currentIndex, setCurrentIndex] = useState<number>(0); // Reset index when new phrase is created


    //const network = WalletAdapterNetwork.Devnet;
    //const endpoint = useMemo(() => clusterApiUrl(network), [network]);

    async function Buttonhandler() {
        setPublicKeys([]);
        setPrivateKeys([]);
        setCurrentIndex(0);

        const { mnemonics, sepMnemonics } = await Mnemonics(); 
        setMneuRaw(mnemonics);  //  raw mnemonic without any spaces
        setMnemonic(sepMnemonics);  // space  separated mnemonic words
    }

    return (
        <>
        
            <Button onClick={Buttonhandler}>
                Create Seed Phrase
            </Button>
            <div style={{ border: '1px solid #ccc', padding: '10px', display: 'flex', flexWrap: 'wrap' }}>
                {mnemonic.map((word, index) => (
                    <div key={index} style={{ margin: '5px', padding: '5px', border: '1px solid #999', borderRadius: '4px' }}>
                        {word}
                    </div>
                ))}
            </div>
            <SolanaWallet mnemonic={mneuRaw}
                          publicKeys = {publicKeys} 
                          privateKeys={privateKeys}
                          setPublicKeys={setPublicKeys}
                          setPrivateKeys={setPrivateKeys}
                          currentIndex={currentIndex}
                          setCurrentIndex={setCurrentIndex}/>

            <ConnectionProvider endpoint={"https://api.devnet.solana.com"}>
                <WalletProvider wallets={[]} autoConnect>
                    <WalletModalProvider>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <WalletMultiButton />
                            <WalletDisconnectButton />
                        </div>
                        <WalletInfo />
                    </WalletModalProvider>
                </WalletProvider>
            </ConnectionProvider>
        </>
    );

    function WalletInfo() {
    const wallet = useWallet(); // Moved here, inside WalletProvider context
    

    return (
        <div>
            {wallet.connected ? (
                <div>
                    <strong>Public Key:</strong> {wallet.publicKey?.toBase58() || "Not available"}
                </div>
            ) : (
                "Wallet not connected"
            )}
        </div>
    );
}
}

export default App;
