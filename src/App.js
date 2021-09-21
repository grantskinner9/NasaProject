import './styles/App.css';
import Results from './Results';
import { useEffect, useState } from 'react';
import firebase from './firebase';

function App() {

  const [nasaPhotos, setNasaPhotos] = useState([]);
  const [showLoader, setShowLoader] = useState(true);

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
    // If response is successful, run .then(), else run .catch()
    .then(res => {
      if(res.ok) {
        return res.json()
      } else {
        throw new Error(res.statusText);
      }
    })
    .then(data => {
      // set data to show most recent at top
      data.reverse();
      // Filter results to only include images
      const filteredResults = data.filter(result => result.media_type === "image");
      // Reference firebase database, and get data values
      const dbRef = firebase.database().ref();
      dbRef.on('value', (response) => {
        const myData = response.val();
        const arrData = [];
        // push liked photos from firebase DB into arrData array
        for(let key in myData) {
          const photoObj = {
            key: key,
            photo: myData[key]
          }
          arrData.push(photoObj)
        }
        // Match the fetch API results with the liked photos from firebase DB.  If any of the firebase values match the values of the fetch API call, we add a "liked" property with the value of "true", and a "key" property with the key value from firebase.
        for (let i = 0; i < filteredResults.length; i++) {
          for (let j = 0; j < arrData.length; j++) {
            if(filteredResults[i].date === arrData[j].photo.date) {
              filteredResults[i].liked = true;
              filteredResults[i].key = arrData[j].key
            }
          }
        }
        // push filtered API results, with "liked" and "key" properties into state
        setNasaPhotos(filteredResults);
        // Turn animated loader off
        setShowLoader(false);
      })
    })
    .catch(err => {
      // Error handling if issue with fetching API results
      if (err.message === "Not Found") {
        alert("We couldn't find this artist at this time.  Try again later.")
      } else {
        alert("Something went wrong.  Try again later.")
      }
    })
  },[])

  // Function is called on onClick of heart icon
  const handleClick = (result) => {
    // Run if clicked result does NOT have a "liked" property on it
    if (!result.liked) {
      // Make a copy of nasaPhotos state array.
      const displayedPhotos = [...nasaPhotos];
      // Loop through array of displayed photos, and match the clicked result to it.  Add a "liked" property to photo that was clicked.
      displayedPhotos.forEach(photo => {
        if(result.date === photo.date) {
          photo.liked = true;
        }
      })
      // create an object of date, title and liked.  This object gets pushed into firebase DB to save "liked" values in memory.
      const likedObj = {
        date: result.date,
        liked: true,
        title: result.title
      }
      const dbRef = firebase.database().ref();
      dbRef.push(likedObj);
      // New array with new "liked" property is pushed to state to trigger page render and display the newly "liked" photo
      setNasaPhotos(displayedPhotos);
    } else {
      console.info(result)
      // runs if clicked result DOES have a "liked" property on it.
      // Make a copy of nasaPhotos state array.
      const displayedPhotos = [...nasaPhotos];
      // Change the "liked" property to false.  Grab the "key" value which gets used to remove photo from firebase DB
      let key;
      displayedPhotos.forEach(photo => {
        if(result.date === photo.date) {
          photo.liked = false;
          key = photo.key
        }
      })
      const dbRef = firebase.database().ref();
      dbRef.child(key).remove();
      /// New array with "liked" property is pushed to state to trigger page render and display the newly "disliked" photo
      setNasaPhotos(displayedPhotos);
    }
  }

  return (
    <div className="App">
      <header>
        <h1>spacestagram</h1>
      </header>
      <main>
        {/* If showLoader is true, run loader animation.  If showLoader is false(when API returns) Results component is rendered  */}
        {
          showLoader ?
          <div className="lds-ring"><div></div><div></div><div></div><div></div></div> :
          <Results
          nasaPhotos = {nasaPhotos} 
          handleClick = {handleClick}
          />
        }
      </main>
      <footer>
        {/* If showLoader is true, run loader animation.  If showLoader is false(when API returns) footer  is rendered */}
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
