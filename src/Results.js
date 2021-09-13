import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Results = ({nasaPhotos}) => {
  return(
    <ul className="imageResults">
      {
        nasaPhotos.map(results => {
          return(
            <li key={results.date} className="imageGrid">
              <img src={results.url} alt={results.title} />
              <div className="seeMore">
                <p>See More</p>
                <FontAwesomeIcon icon={faHeart}/>
              </div>
            </li>
          )
        })
      }
    </ul>
  )
}

export default Results;