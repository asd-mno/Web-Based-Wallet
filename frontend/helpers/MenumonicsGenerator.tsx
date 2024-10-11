function getRandomWords(count: number, setWords: (words: string[]) => void) {
  fetch('/english.txt')
    .then(response => response.text())
    .then(data => {
      //console.log(data);

      const words = data.split('\n').map(word => word.trim());

      const randomWords : string[] = []
      while (randomWords.length < count) {
        const randomIndex = Math.floor(Math.random() * words.length);
        randomWords.push(words[randomIndex]);
      }
      setWords(randomWords);
    })
    .catch(error => {
      console.error('Error reading file:', error);
    });
};

export default getRandomWords