import { useState, useEffect } from 'react';
import './App.css';

export async function getCharacters() {
  const res = await fetch(
    `http://gateway.marvel.com/v1/public/characters?apikey=ce7e495f079bd4d8b4dedb554c8ed299`
  );
  return res.json();
}

function App() {
  const [characters, setCharacters] = useState('');

  useEffect(() => {
    async function get() {
      const characters = await getCharacters();
      setCharacters(characters);
    }
    get();
  }, []);

  console.log(characters);

  return <div></div>;
}

export default App;
