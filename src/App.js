import './styles/App.css';
import Results from './Results';
import { useEffect, useState } from 'react';
import firebase from './firebase';

function App() {

  const [nasaPhotos, setNasaPhotos] = useState([]);
  const [showLoader, setShowLoader] = useState(true);
  const [photosInDB, setPhotosInDB] = useState([]);

  useEffect(() => {
    // Grab todays date
    const endDate = new Date().toISOString().split('T')[0];

    // Grab date from last month
    const prevMonth = new Date();
    prevMonth.setMonth(prevMonth.getMonth()-1);
    const startDate = prevMonth.toISOString().split('T')[0];

    // Make API call and set the returned date to state
    const apiKey = 'x09Mwv7oSt8NV1wBZNGHN1C03a0YX1SRRSVDUYcz';
    fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&start_date=${startDate}&end_date=${endDate}`)
    .then(res => res.json())
    .then(data => {
      // set data to show most recent at top
      data.reverse();
      // Filter results to only include images
      const filteredResults = data.filter(result => result.media_type === "image")
      const dbRef = firebase.database().ref();
      dbRef.on('value', (response) => {
        const myData = response.val();
        const arrData = [];

        for(let key in myData) {
          const photoObj = {
            key: key,
            photo: myData[key]
          }
          arrData.push(photoObj)
        }
        for (let i = 0; i < filteredResults.length; i++) {
          for (let j = 0; j < arrData.length; j++) {
            if(filteredResults[i].date === arrData[j].photo.date) {
              filteredResults[i].liked = true;
              filteredResults[i].key = arrData[j].key
            }
          }
        }
        setPhotosInDB(arrData)
        // push data into state
        setNasaPhotos(filteredResults);
        // Turn animated loader off
        setShowLoader(false);
      })
    })
  },[])

  const handleClick = (result) => {
    if (!result.liked) {
      const displayedPhotos = [...nasaPhotos];
      displayedPhotos.forEach(photo => {
        if(result.date === photo.date) {
          photo.liked = true;
        }
      })
      const likedObj = {
        date: result.date,
        liked: true,
        title: result.title
      }
      const dbRef = firebase.database().ref();
      dbRef.push(likedObj);
      setNasaPhotos(displayedPhotos)

    } else {
      const displayedPhotos = [...nasaPhotos];
      let key;
      displayedPhotos.forEach(photo => {
        if(result.date === photo.date) {
          photo.liked = false;
          key = photo.key
        }
      })
      const dbRef = firebase.database().ref();
      dbRef.child(key).remove();
    }
  }

  return (
    <div className="App">
      <header>
        <h1>spacestagram</h1>
      </header>
      <main>
        {
          showLoader ?
          <div className="lds-ring"><div></div><div></div><div></div><div></div></div> :
          <Results
          nasaPhotos = {nasaPhotos} 
          photosInDB = {photosInDB}
          handleClick = {handleClick}
          />
        }
      </main>
      <footer>
        {
          showLoader ?
          null :
          <p>Made by Grant Skinner for Shopify Challenge</p>
        }
      </footer>
    </div>
  );
}

export default App;
