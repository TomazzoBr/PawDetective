import { useAuth0 } from "@auth0/auth0-react";
import { useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  toggleIsLost,
  changeAnimalForm,
  changeDescriptionForm,
  changeLocationForm,
} from "../../actions/index";

import Map from "../Map/Map";
import PicturesUpload from "../Pictures/Pictures";

import globalContext from "../../services/globalContext";

const PawsForm = () => {
  const { customProps } = useContext(globalContext);
  const { handleSubmit } = customProps;

  const animalForm = useSelector((state) => state.form);
  const { lostOrFound, animal, description, location } = animalForm;

  const dispatch = useDispatch();
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  return (
    <div>
      <div className="form-page-container">
        <div className="map-container">
          <div className="map">
            <Map />
          </div>
        </div>
        <div className="form-container">
          <div className="form-title">
            <h3>YOUR PET INFO</h3>
          </div>
          <form className="add-form" onSubmit={(e) => handleSubmit(e)}>
            {/* choose if you lost a pet or found a lost one */}
            <div className="form-control">
              <div className="left-form">
                <label>Lost or Found?</label>
                <select
                  name="lostOrFound"
                  value={lostOrFound ? "Lost" : "Found"}
                  onChange={(e) => {
                    dispatch(toggleIsLost(e.target.value));
                  }}
                >
                  <option value="Lost">Lost</option>
                  <option value="Found">Found</option>
                </select>
                {/* add user name */}
                <div className="left-form-input">
                  <label>Your name</label>
                  <input
                    name="your-name"
                    type="text"
                    placeholder=" Insert your name here"
                  ></input>
                </div>
                <div>
                  {/* choose what kind of animal it is */}
                  <label>Animal</label>
                  <select
                    name="animal"
                    value={animal}
                    onChange={(e) => {
                      dispatch(changeAnimalForm(e.target.value));
                    }}
                  >
                    <option value="Dog">Dog</option>
                    <option value="Cat">Cat</option>
                    <option value="Bunny">Bunny</option>
                    <option value="Bird">Bird</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                {/* add a description of the animal and any other details */}
                <div className="left-form-input">
                  <label>Description</label>
                  <input
                    name="description"
                    type="text"
                    placeholder=" More details..."
                    value={description}
                    onChange={(e) => {
                      dispatch(changeDescriptionForm(e.target.value));
                    }}
                  />
                </div>
                {/* choose the location you lost or found the pet */}
                <div className="left-form-input">
                  <label>Location</label>
                  <input
                    name="location"
                    type="text"
                    placeholder=" Where?"
                    value={location}
                    onChange={(e) => {
                      dispatch(changeLocationForm(e.target.value));
                    }}
                  />
                </div>
              </div>
              <div className="right-form">
                {/* add a picture */}
                <div>
                  <label>Picture</label>
                  <PicturesUpload />
                </div>
                <div>
                  <button className="submit-btn" type="submit">
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PawsForm;
