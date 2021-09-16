import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import firebase from "./firebase"


const Results = ({nasaPhotos, photosInDB}) => {

  const [ likePhoto, setLikePhoto ] = useState([]);
  
  const heartPhoto = (title, date) => {
    const photosObject = {
      title: title,
      date: date,
      liked: true
    }
    const dbRef = firebase.database().ref();
    dbRef.push(photosObject);
  }
  

  return(
    <ul className="imageResults">
      {
        nasaPhotos.map(results => {
          console.info(results)
          return(
            <li key={results.date} className="imageGrid">
              <img src={results.url} alt={results.title} />
              <div className="seeMore">
                <p>See More</p>
                {
                  results.liked ?
                  <FontAwesomeIcon icon={faHeartSolid} onClick={() => heartPhoto(results.title, results.date)}/> :
                  <FontAwesomeIcon icon={faHeartRegular} />
                }
              </div>
            </li>
          )
        })
      }
    </ul>
  )
}

export default Results;