import { useDispatch } from "react-redux";
import { openModal } from "../../../../actions/index";

const PawsItem = ({ paw }) => {
  const dispatch = useDispatch();

  return (
    <div key={paw.picture} className="paw-item">
      <div
        style={{ backgroundImage: `url(${paw.picture})` }}
        className="pet-picture"
      ></div>
      <div className="descr-loc-container">
        <p>
          Location: <span>{paw.location}</span>
        </p>
      </div>
      <div>
        <button
          name={paw._id}
          onClick={(e) => {
            dispatch(openModal(e.target.name));
          }}
        >
          See more
        </button>
      </div>
    </div>
  );
};

export default PawsItem;
