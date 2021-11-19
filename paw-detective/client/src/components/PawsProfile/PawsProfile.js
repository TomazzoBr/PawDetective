import "./../../styles/PawsProfile.css";
import { FaHome } from "react-icons/fa";
import { useLocation, Link } from "react-router-dom";
import Map from "../Map/Map";

const PawsProfile = () => {
  const location = useLocation();

  // const {
  //   lostOrFound,
  //   picture,
  //   animal,
  //   description,
  //   address = location.state.location,
  //   lat,
  //   long,
  //   date,
  // } = location.state;

  const lostOrFound = "Found";
  const picture = "https://firebasestorage.googleapis.com/v0/b/paw-detective-app.appspot.com/o/images%2Fparrot.jpg?alt=media&token=744f23c7-1a28-4574-97f6-769ab76791d3";
  const animal = "Bird";
  const description = "I found this little blue parrot in my garden. If anyone is looking for it contact me!";
  const address = "Dublin";
  const lat = 53.59119120788164;
  const long = -6.4613600058531695;
  const date = "2021-11-16T21:13:16.879Z";

  const profileMarker = {
    lat,
    long,
    time: new Date(date),
  };

  return (
    <div>
      <header className="form-header">
        <h1 className="title-header"> PAW PROFILE </h1>
        <div className="login-logo">
          <Link to="/">
            <FaHome size={30} />
          </Link>
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

          <Map profileMarker={{ profileMarker }} />

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
