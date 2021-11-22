import "./../../styles/PawsProfile.scss";

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

  const profileMarker = {
    lat,
    long,
    time: new Date(date),
  };

  const mockComments = [
    'Its dead already just give up',
    'Yesterday I saw it',
    'I just have it, now is my catto',
    'Okay Im tired of it, I can sell it for 5€',
    'I give you 2!!',
    'No thanks I like bananas'
  ]
  const comments = mockComments.map(comment => <div className="bubble"><p>{comment}</p></div>);

  return (
    <div className="modelAnimal" onClick={()=>{dispatch(closeModal())}}>
      <div className="container-wrap">
        <div className="profile-container">
          
          <div className="descr-loc-container">
            <div className="animal-picture">
              <img className="pet-picture" src={picture} alt={`a ${animal}`}></img>
            </div>
            {/* <p className="lost-found-title">{lostOrFound}</p> */}
            <div className="animal-data">
              <h5>Description:</h5>
              <p>{description}</p>
              <h5>Location:</h5>
              <p>{address}</p>
            </div>
          </div>

          <Map profileMarker={{ profileMarker }} />
        </div>

        <div className="comment-section">
          <h3>Comments</h3>
          <div className="block">
            <p>{comments}</p>
          </div>
          <div className="input">
            <input
                name="comment"
                type="text"
                placeholder="Write your comment..."
                value=""
              />
            <button className="pic-button">Send</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PawsProfile;
