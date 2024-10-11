import { useState, useEffect } from 'react';
import './App.css'
import getRandomWords from '../helpers/MenumonicsGenerator.tsx'
import pub_priKey from '../helpers/pub-priKey.tsx'

function App() {

  const [words, setWords] = useState<string[]>([]);
  const[pubKey , setPubKey] = useState<string>("");
  const[priKey , setPriKey] = useState<string>("");

  useEffect(() => {
    getRandomWords(10, setWords);
    pub_priKey(setPubKey , setPriKey);
  }, []);

  return (
    <>
    {/* Printing the mnemonics */}
      {/* {
        words.map((word, index) => (
          <li key={index}>
            {word}
          </li>
        ))
      } */}
   <div> pubKey =  {pubKey}</div>
   <div>priKey = {priKey} </div>
    </>
  )
}

export default App
