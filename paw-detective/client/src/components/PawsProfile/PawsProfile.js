import "./../../styles/PawsProfile.css";
import { FaHome } from "react-icons/fa";
import { useLocation, useHistory } from "react-router-dom";
import Map from "../Map/Map";

const PawsProfile = () => {
  const location = useLocation();
  const history = useHistory();

  const {
    lostOrFound,
    picture,
    animal,
    description,
    address = location.state.location,
    lat,
    long,
    date,
  } = location.state;

  const profileMarker = {
    lat, long, time: new Date(date)
  }

  return (
    <div>
      <header className="form-header">
        <h1 className="title-header"> PAW PROFILE </h1>
        <div className="login-logo">
          <FaHome size={30} onClick={() => history.push("/")} />
        </div>
      </header>
      <div className="container-wrap">
        <div className="profile-container">

          <p className="lost-found-title">{lostOrFound}</p>
          <img className="pet-picture" src={picture} alt={`a ${animal}`}></img>
          <p>{animal}</p>

          <div className="descr-loc-container">
            <h5>Description:</h5>
            <p>{description}</p>
            <h5>Location:</h5>
            <p>{address}</p>

          </div>

          <Map profileMarker={{profileMarker}} />

          <div className="comment-section">

            <h3>Comment</h3>
            <p className="text-comment">...</p>
            <button className="pic-button">Send</button>

          </div>
        </div>
      </div>
    </div>
  );
};
export default PawsProfile;
