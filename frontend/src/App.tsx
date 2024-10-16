import { useState, useEffect } from 'react';
import './App.css'
import getRandomWords from '../helpers/MenumonicsGenerator.tsx'
import pub_priKey from '../helpers/pub-priKey.tsx'
import { generateMnemonic } from "bip39";
import { SolanaWallet } from './pages/SolanaWallet.tsx';
import { Button } from './components/ui/button.tsx';

function App() {

  const [mnemonic, setMnemonic] = useState<string[]>([]);
  const [mneuRaw, setmneuRaw] = useState<string>("")
  const [words, setWords] = useState<string[]>([]);
  const[pubKey , setPubKey] = useState<string>("");
  const[priKey , setPriKey] = useState<string>("");

  useEffect(() => {
    getRandomWords(10, setWords);
    pub_priKey(setPubKey , setPriKey);
  }, []);



  return (
    <>
      <Button onClick={async function () {
        const mn = await generateMnemonic();
        const newWords = mn.split(' ');
        setmneuRaw(mn);
        setMnemonic(newWords)
      }}>
        Create Seed Phrase
      </Button>


      <div style={{ border: '1px solid #ccc', padding: '10px', display: 'flex', flexWrap: 'wrap' }}>
        {
          mnemonic.map((word, index) => (
            <div key={index} style={{ margin: '5px', padding: '5px', border: '1px solid #999', borderRadius: '4px' }}>
              {word}
            </div>
          ))
        }
      </div>
      {/* <input type="text" value={mnemonic}></input> */}

      <SolanaWallet mnemonic={mneuRaw} />




    {/* Printing the mnemonics */}
      {/* {
        words.map((word, index) => (
          <li key={index}>
            {word}
          </li>
        ))
      } */}
      {/* <div> pubKey =  {pubKey}</div>
   <div>priKey = {priKey} </div> */}

    </>
  )
}

export default App
