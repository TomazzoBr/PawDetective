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
      "_id": {
        "$oid": "61941eec4bf9e3b1b5effddc"
    },
    "lostOrFound": "Found",
    "picture": "https://firebasestorage.googleapis.com/v0/b/paw-detective-app.appspot.com/o/images%2Fparrot.jpg?alt=media&token=744f23c7-1a28-4574-97f6-769ab76791d3",
    "animal": "Bird",
    "description": "I found this little blue parrot in my garden. If anyone is looking for it contact me!",
    "location": "Dublin",
    "lat": 53.59119120788164,
    "long": -6.4613600058531695,
    "email": "natasa410@hotmail.com",
    "date": {
        "$date": "2021-11-16T21:13:16.879Z"
    },
  */

  // I should get the element from paws that have the same id as
  // selectedAnimal, and then retrieve data from there

  //Also modify the class of the modal to make it smaller and
  //position absolute to put it in the middle of the screen

  // const {
  //   lostOrFound,
  //   picture,
  //   animal,
  //   description,
  //   address,
  //   lat,
  //   long,
  //   date,
  // } = location.state;

  const profileMarker = {
    lat,
    long,
    time: new Date(date),
  };

  return (
    <div className="modelAnimal">
      <header className="form-header">
        <h1 className="title-header"> PAW PROFILE </h1>
        <div
          onclick={() =>{changeAnimalModal(0)}}
          className="login-logo">
            <FaHome size={30} />
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
