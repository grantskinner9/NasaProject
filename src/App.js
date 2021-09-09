import './App.css';
import Results from './Results';
import { useEffect, useState } from 'react';


function App() {

  const [nasaPhotos, setNasaPhotos] = useState([]);
  const [showLoader, setShowLoader] = useState(true)

  useEffect(() => {
    // Grab todays date
    const endDate = new Date().toISOString().split('T')[0];

    // Grab date from last month
    const prevMonth = new Date();
    prevMonth.setMonth(prevMonth.getMonth()-1);
    const startDate = prevMonth.toISOString().split('T')[0];
    console.log(endDate);
    console.log(startDate);

    // Make API call and set the returned date to state
    const apiKey = 'x09Mwv7oSt8NV1wBZNGHN1C03a0YX1SRRSVDUYcz';
    fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&start_date=2021-08-09&end_date=2021-09-09`)
    .then(res => res.json())
    .then(data => {
      data.reverse();
      console.log(data);
      setNasaPhotos(data);
      setShowLoader(false);
    })
  },[])

  return (
    <div className="App">
      <header>
        <h1>Rover</h1>
      </header>
      {
        showLoader ?
        <div className="lds-ring"><div></div><div></div><div></div><div></div></div> :
        <Results
        nasaPhotos = {nasaPhotos} 
        />
      }
    </div>
  );
}

export default App;
