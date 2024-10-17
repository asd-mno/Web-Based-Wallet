import { useState } from 'react';
import './App.css';
import { SolanaWallet } from './pages/SolanaWallet.tsx';
import { Button } from './components/ui/button.tsx';
import { Mnemonics } from './helpers/Mnemonics.tsx';

function App() {
    const [mnemonic, setMnemonic] = useState<string[]>([]);
    const [mneuRaw, setMneuRaw] = useState<string>("");
     const [publicKeys, setPublicKeys] = useState<string[]>([]); // Store public keys for resetting
    const [privateKeys, setPrivateKeys] = useState<string[]>([]); // Store private keys for resetting
    const [currentIndex, setCurrentIndex] = useState<number>(0); // Reset index when new phrase is created


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
        </>
    );
}

export default App;
