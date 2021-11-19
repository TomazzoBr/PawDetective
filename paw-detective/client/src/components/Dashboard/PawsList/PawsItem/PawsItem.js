import "./../../../../styles/PawsItem.css";
import { Link } from "react-router-dom";
// import ApiService from "../../services/ApiService";
import { useContext} from 'react'

import globalContext from '../../../../services/globalContext'

const PawsItem = ({ paw, key }) => {

  const customProps = useContext(globalContext);
  const {deletePawsHandler} = customProps;

  return (
    <li key={paw.picture}>
      <p className="lost-found-title">{paw.lostOrFound}</p>
      <img
        className="pet-picture"
        src={paw.picture}
        alt={`a ${paw.animal} pic`}
      ></img>
      <p>{paw.animal}</p>
      <div className="descr-loc-container">
        <h5>Description:</h5>
        <p>{paw.description}</p>
        <h5>Location:</h5>
        <p>{paw.location}</p>
      </div>
      <div className="topic_delete">
        {
          <button
            className="delete_btn"
            onClick={() => {
              if (window.confirm("Are you sure you wish to delete this item?"))
                deletePawsHandler(key);
            }}
          >
            <span
              role="img"
              aria-label="delete-button"
              className="delete-button"
            >
              ❌
            </span>
          </button>
        }
      </div>
    </li>
  );
};

export default PawsItem;
