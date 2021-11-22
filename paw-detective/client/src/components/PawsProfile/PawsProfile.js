import "./../../styles/PawsProfile.css";

import { useContext, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { closeModal } from '../../actions/index'

import globalContext from '../../services/globalContext'

import Map from "../Map/Map";

const PawsProfile = () => {

  const dispatch = useDispatch();

  const {customProps} = useContext(globalContext)
  const {paws} = customProps;

  const selectedAnimal = useSelector(state => state.modalSelection)
  useEffect(() => {},[selectedAnimal])

  const animalByID = paws.filter(paw => paw._id === selectedAnimal)[0];

  const {
    lostOrFound,
    picture,
    animal,
    description,
    address,
    lat,
    long,
    date,
  } = animalByID
  console.log(animalByID);
  // const lostOrFound="Lost";
  // const address="Home";

  const profileMarker = {
    lat,
    long,
    time: new Date(date),
  };

  return (
    <div className="modelAnimal" onClick={()=>{dispatch(closeModal())}}>
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
