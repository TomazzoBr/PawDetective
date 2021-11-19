import "./../../styles/PawsForm.css";
import { useState, useContext } from "react";
import ApiService from "../../services/ApiService";
// dont need anymore useState or ApiService as you have everything in App component
import { FaHome } from "react-icons/fa";
import { useAuth0 } from "@auth0/auth0-react";
import { useHistory } from "react-router-dom";
import Map from "../Map/Map";
import PicturesUpload from "../Pictures/Pictures";

import globalContext from "../../services/globalContext"

const PawsForm = () => {

  const {customProps} = useContext(globalContext);
  const {
    lostOrFound, picture, animal, description, location, lat, long, //Those are states, and the set states should be handled by a single function in App.js
    postPawHandler, handleSubmit //postPawHandler is a function that is being called by handleSubmit
  } = customProps;

  const {
    user: { email },
    getAccessTokenSilently,
  } = useAuth0();
  
  const history = useHistory();

  return (
    <div>
      <header className="form-header">
        <h1 className="title-header"> LOST or FOUND PAWS </h1>
        <div className="login-logo">
          <FaHome size={30} onClick={() => history.push("/")} />
        </div>
      </header>
      <div className="form-container">
        <form className="add-form" onSubmit={(e)=>handleSubmit(e)}>
          {/* choose if you lost a pet or found a lost one */}
          <div className="form-control">
            <div>
              <h4 style={{ color: "blue" }}>What happened?</h4>
            </div>
            <label>Lost or Found?</label>
            <select
              value={lostOrFound}
              onChange={(e) => setLostorFound(e.target.value)}
            >
              <option value="Lost">Lost</option>
              <option value="Found">Found</option>
            </select>
          </div>
          {/* add a picture */}
          <div className="form-control">
            <label>Picture</label>
            <PicturesUpload setPicture={setPicture} />
          </div>
          {/* choose what kind of animal it is */}
          <div className="form-control">
            <label>Animal</label>
            <select value={animal} onChange={(e) => setAnimal(e.target.value)}>
              <option value="Dog">Dog</option>
              <option value="Cat">Cat</option>
              <option value="Bunny">Bunny</option>
              <option value="Bird">Bird</option>
              <option value="Other">Other</option>
            </select>
          </div>
          {/* add a description of the animal and any other details */}
          <div className="form-control">
            <label>Description</label>
            <input
              type="text"
              placeholder="more details..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          {/* choose the location you lost or found the pet */}
          <div className="form-control">
            <label>Location</label>
            <input
              type="text"
              placeholder="where?"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div>
            <Map setLat={setLat} setLong={setLong} />
          </div>
          <button className="upload-button" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default PawsForm;
