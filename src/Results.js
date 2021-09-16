import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";

const Results = ({nasaPhotos, handleClick}) => {


  return(
    <ul className="imageResults">
      {
        nasaPhotos.map(results => {
          return(
            <li key={results.date} className="imageGrid">
              <img src={results.url} alt={results.title} />
              <div className="seeMore">
                <p>See More</p>
                {
                  results.liked ?
                  <FontAwesomeIcon icon={faHeartSolid} onClick={() => handleClick(results)}/> :
                  <FontAwesomeIcon icon={faHeartRegular} onClick={() => handleClick(results)}/>
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