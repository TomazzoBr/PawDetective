import "./../../styles/PawsProfile.css";

import { useContext, useEffect } from 'react'
import { FaHome } from "react-icons/fa";

import globalContext from '../../services/globalContext'

import Map from "../Map/Map";

const PawsProfile = () => {

  const {customProps} = useContext(globalContext)
  const {selectedAnimal, changeAnimalModal, paws} = customProps;

  useEffect(() => {},[selectedAnimal])

  /*Object from db:
    animal: "Cat"
    date: "2021-11-16T21:18:16.014Z"
    description: "Grizzly is a grey/white cat. She wears a red collars with our address on it."
    email: "natasa410@hotmail.com"
    lat: 54.16314828187047
    location: "Isle of Man"
    long: -4.585993996081346
    picture: "https://firebasestorage.googleapis.com/v0/b/paw-detective-app.appspot.com/o/images%2Fcatpic.jpg?alt=media&token=463c3a41-0bc2-4e40-99c7-74ef3d3321ec"
    __v: 0
    _id: "619420184bf9e3b1b5effde3"
  */
  const animalByID = paws.filter(paw => paw._id === selectedAnimal)[0];

  const {
    // lostOrFound,
    picture,
    animal,
    description,
    // address,
    lat,
    long,
    date,
  } = animalByID

  const lostOrFound="Lost";
  const address="Home";

  // I should get the element from paws that have the same id as
  // selectedAnimal, and then retrieve data from there

  //Also modify the class of the modal to make it smaller and
  //position absolute to put it in the middle of the screen

  const profileMarker = {
    lat,
    long,
    time: new Date(date),
  };

  return (
    <div className="modelAnimal"
    onClick={()=>{changeAnimalModal("0")}}
    >
      {/* <header className="form-header">
        <h1 className="title-header"> PAW PROFILE </h1>
        <div
          className="login-logo">
            <FaHome size={30} />
        </div>
      </header> */}
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
