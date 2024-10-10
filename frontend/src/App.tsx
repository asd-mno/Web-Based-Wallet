import { useState, useEffect } from 'react';
import './App.css'
import getRandomWords from '../helpers/MenumonicsGenerator.tsx'

function App() {

  const [words, setWords] = useState<string[]>([]);
  useEffect(() => {
    getRandomWords(10, setWords);
  }, []);

  return (
    <>
      {
        words.map((word, index) => (
          <li key={index}>
            {word}
          </li>
        ))
      }
    </>
  )
}

export default App
