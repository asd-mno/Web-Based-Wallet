import { useState, useContext } from 'react';
import './App.css';
import { generateMnemonic } from "bip39";
import { SolanaWallet } from './pages/SolanaWallet.tsx';
import { Button } from './components/ui/button.tsx';
import { KeysContext } from './context/context.tsx';

function App() {
    const [mnemonic, setMnemonic] = useState<string[]>([]);
    const [mneuRaw, setmneuRaw] = useState<string>("");

    // Access context for keys and their setter functions
    const Keys = useContext(KeysContext);

    return (
        <>
            <Button onClick={async function () {
                const mn = await generateMnemonic();
                const newWords = mn.split(' ');
                setmneuRaw(mn);
                setMnemonic(newWords);
                
                // // Resetting keys using the context's setter functions
                // Keys.setPublicKey([]); // Reset public keys
                // Keys.setPrivateKey([]); // Reset private keys
                
                console.log("Resetting keys");
            }}>
                Create Seed Phrase
            </Button>

            <div style={{ border: '1px solid #ccc', padding: '10px', display: 'flex', flexWrap: 'wrap' }}>
                {mnemonic.map((word, index) => (
                    <div key={index} style={{ margin: '5px', padding: '5px', border: '1px solid #999', borderRadius: '4px' }}>
                        {word}
                    </div>
                ))}
            </div>

            <SolanaWallet mnemonic={mneuRaw} />

        </>
    );
}

export default App;
