import { Link } from "react-router-dom";
import "./PawsItem.css";
import apiService from "../../ApiService";

const PawsItem = ({ paw, setPaws, setFilteredPaws }) => {
  const deletePawsHandler = async () => {
    await apiService.deletePaws(paw._id);
    setPaws((prev) =>
      prev.filter((notDeletedPaw) => notDeletedPaw._id !== paw._id)
    );
    setFilteredPaws((prev) =>
      prev.filter((notDeletedPaw) => notDeletedPaw._id !== paw._id)
    );
  };

  return (
    <li key={paw.picture}>
      <Link
        to={{
          pathname: `/profile/${paw._id}`,
          state: paw,
        }}
        className="paws-item"
      >
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
      </Link>
      <div className="topic_delete">
        {
          <button
            className="delete_btn"
            onClick={() => {
              if (window.confirm("Are you sure you wish to delete this item?"))
                deletePawsHandler();
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
