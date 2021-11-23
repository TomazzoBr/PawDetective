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
    <div key={paw.picture} class="paw-item">
      {/* <p className="lost-found-title">{paw.lostOrFound}</p> */}
      <div
        style={{ backgroundImage: `url(${paw.picture})` }}
        name={paw._id}
        className="pet-picture"
        onClick={(e)=>{dispatch(openModal(e.target.name))}}
      ></div>
      <div className="descr-loc-container">
        <p>{paw.location}</p>
      </div>
      <div className="descr-loc-container">
        <p>{paw.animal}</p>
      </div>
      {/* <div className="topic_delete">
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
      </div> */}
    </div>
  );
};

export default PawsItem;
