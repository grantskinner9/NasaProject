import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef } from "react";

const Modal = ({modalInfo, handleClick, closeModal}) => {

  let containerRef = useRef();

  // Effect handles click outside of modal to close
  useEffect(() => {
    let handler = (e) => {
      if(!containerRef.current.contains(e.target)) {
        closeModal();
      }
    };
    document.addEventListener("mousedown", handler)
    return () => {
      document.removeEventListener("mousedown", handler);
    }
  })

  return(
    <div className="modalContainer">
      <div ref={containerRef} className="modal">
        <div className="imageContainer">
          <img src={modalInfo.url} alt={modalInfo.title} />
        </div>
        <div className="textContainer">
          <FontAwesomeIcon className="close" icon={faTimes} onClick={closeModal}/>
          <h2>{modalInfo.title}</h2>
          <p>{modalInfo.date}</p>
          <p className="description">{modalInfo.explanation}</p>
          {
            modalInfo.liked ?
            <FontAwesomeIcon className="heart liked" icon={faHeartSolid} onClick={() => handleClick(modalInfo)}/> :
            <FontAwesomeIcon className="heart" icon={faHeartRegular} onClick={() => handleClick(modalInfo)}/>
          }
        </div>
      </div>
    </div>
  )
}

export default Modal;