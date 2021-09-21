import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Modal from "./Modal";

const Results = ({nasaPhotos, handleClick}) => {

  const [ modal, setModal ] = useState(false);
  const [ modalInfo, setModalInfo ] = useState({})

  // Runs on onClick event.  Opens Modal and provides modal information to state
  const openModal = (result) => {
    setModal(true)
    setModalInfo(result)
  }

  // Runs on onClick event.  Closes Modal.
  const closeModal = () => {
    setModal(false)
  }

  return(
    <>
    <ul className="imageResults">
      {/* map over returned API results.  Display to page.  If a photo has a "liked" property on it, use a solid heart icon, otherwise use an outlined heart icon */}
      {
        nasaPhotos.map(results => {
          return(
            <li key={results.date} className="imageGrid">
              <img src={results.url} alt={results.title} />
              <div className="seeMore">
                <p className="seeText" onClick={() => openModal(results)}>See More</p>
                {
                  results.liked ?
                  <FontAwesomeIcon className="resultsHeart liked" icon={faHeartSolid} onClick={() => handleClick(results)}/> :
                  <FontAwesomeIcon className="resultsHeart" icon={faHeartRegular} onClick={() => handleClick(results)}/>
                }
              </div>
            </li>
          )
        })
      }
    </ul>
    {/* If modal state is true, open modal with information on the picture */}
    {
      modal ?
      <Modal 
      closeModal={closeModal}
      modalInfo={modalInfo}
      handleClick={handleClick} /> :
      null
    }
    </>
  )
}

export default Results;