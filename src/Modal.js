import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const Modal = ({modalInfo, handleClick, closeModal}) => {

  return(
    <div className="modalContainer">
      <div className="modal">
        <div className="imageContainer">
          <img src={modalInfo.url} alt={modalInfo.title} />
        </div>
        <div className="textContainer">
          <FontAwesomeIcon icon={faTimes} onClick={closeModal}/>
          <h2>{modalInfo.title}</h2>
          <p>{modalInfo.date}</p>
          <p className="description">{modalInfo.explanation}</p>
          {
            modalInfo.liked ?
            <FontAwesomeIcon icon={faHeartSolid} onClick={() => handleClick(modalInfo)}/> :
            <FontAwesomeIcon icon={faHeartRegular} onClick={() => handleClick(modalInfo)}/>
          }
        </div>
      </div>
    </div>
  )
}

export default Modal;