import './App.css';
import Results from './Results';
import { useEffect, useState } from 'react';


function App() {

  const [nasaPhotos, setNasaPhotos] = useState([]);

  useEffect(() => {
    const apiKey = 'x09Mwv7oSt8NV1wBZNGHN1C03a0YX1SRRSVDUYcz';
    fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`)
    .then(res => res.json())
    .then(data => {
      setNasaPhotos(data);
    })
  },[])

  return (
    <div className="App">
      <header>Rover</header>
      <Results
      nasaPhotos = {nasaPhotos} 
      />
    </div>
  );
}

export default App;
