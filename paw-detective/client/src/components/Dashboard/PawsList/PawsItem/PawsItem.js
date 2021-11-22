import "./../../../../styles/PawsItem.css";

// import ApiService from "../../services/ApiService";
import { useContext} from 'react'
import { useDispatch } from 'react-redux';
import { openModal } from '../../../../actions/index';

import globalContext from '../../../../services/globalContext'

const PawsItem = ({ paw }) => {

  const dispatch = useDispatch();

  const {customProps} = useContext(globalContext);
  const {deletePawsHandler} = customProps;

  return (
    <li key={paw.picture}>
      <p className="lost-found-title">{paw.lostOrFound}</p>
      <img
        name={paw._id}
        className="pet-picture"
        src={paw.picture}
        alt={`a ${paw.animal} pic`}
        onClick={(e)=>{dispatch(openModal(e.target.name))}}
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
                deletePawsHandler(paw._id);
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
