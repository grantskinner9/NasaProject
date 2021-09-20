import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Modal from "./Modal";

const Results = ({nasaPhotos, handleClick}) => {

  const [ modal, setModal ] = useState(false);
  const [ modalInfo, setModalInfo ] = useState({})

  const openModal = (result) => {
    setModal(true)
    setModalInfo(result)
  }

  const closeModal = () => {
    setModal(false)
  }

  return(
    <>
    <ul className="imageResults">
      {
        nasaPhotos.map(results => {
          return(
            <li key={results.date} className="imageGrid">
              <img src={results.url} alt={results.title} />
              <div className="seeMore">
                <p onClick={() => openModal(results)}>See More</p>
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