import { useAuth0 } from "@auth0/auth0-react";
import { useContext, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "../../actions/index";

import globalContext from "../../services/globalContext";

import Map from "../Map/Map";

const PawsProfile = () => {
  const dispatch = useDispatch();

  const { customProps } = useContext(globalContext);
  const { paws, deletePawsHandler } = customProps;

  const { user } = useAuth0();

  let userEmail;
  if (user) {
    userEmail = user.email;
  }

  const selectedAnimal = useSelector((state) => state.modalSelection);
  useEffect(() => {}, [selectedAnimal]);

  const animalByID = paws.filter((paw) => paw._id === selectedAnimal)[0];

  const {
    lostOrFound,
    picture,
    animal,
    description,
    location,
    lat,
    long,
    date,
    email,
  } = animalByID;

  const profileMarker = {
    lat,
    lng: long,
    time: new Date(date),
  };

  const preventModalClosing = (e) => {
    if (e.target.className === "modelAnimal") dispatch(closeModal());
    return;
  };

  const stamp = lostOrFound
    ? "https://www.lostitfoundit.in/images/loststamp.png"
    : "https://www.lostitfoundit.in/images/foundstamp.png";

  const mockComments = [
    "Its dead already just give up",
    "Yesterday I saw it",
    "I just have it, now is my catto",
    "Okay Im tired of it, I can sell it for 5€",
    "I give you 2!!",
    "No thanks I like bananas",
  ];
  const comments = mockComments.map((comment, index) => (
    <div className="bubble" key={index}>
      <p>{comment}</p>
    </div>
  ));

  const deleteBtn = () => {
    if (user) {
      if (email === userEmail) {
        return (
          <div className="topic_delete">
            {
              <button
                className="delete_btn"
                onClick={() => {
                  if (
                    window.confirm("Are you sure you wish to delete this item?")
                  )
                    deletePawsHandler(selectedAnimal);
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
        );
      }
    }
    return null;
  };

  return (
    <div
      className="modelAnimal"
      onClick={(e) => {
        preventModalClosing(e);
      }}
    >
      <div className="container-wrap">
        <div className="profile-container">
          <div className="descr-loc-container">
            <div className="animal-picture">
              <img
                className="pet-picture"
                src={picture}
                alt={`a ${animal}`}
              ></img>
            </div>
            <div className="animal-data">
              <h3>Description:</h3>
              <p>{description}</p>
              <h3>Location:</h3>
              <p>{location}</p>
            </div>
            <img className="stamp" src={stamp} alt={`a ${animal}`}></img>
            {deleteBtn()}
          </div>

          <div className="map-container">
            <Map profileMarker={{ profileMarker }} />
          </div>
        </div>

        <div className="comment-container">
          <div className="comment-section">
            <div className="block">{comments}</div>
            <div className="input">
              <input
                name="comment"
                type="text"
                placeholder="Write your comment..."
              />
              <button className="pic-button">Send</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PawsProfile;
