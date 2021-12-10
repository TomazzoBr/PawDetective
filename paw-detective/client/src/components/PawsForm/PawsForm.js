import "./PawsForm.css";
import { useState } from "react";
import ApiService from "../../ApiService";
import { FaHome } from "react-icons/fa";
import { useAuth0 } from "@auth0/auth0-react";
import { useHistory } from "react-router-dom";
import Map from "../Map/Map";
import PicturesUpload from "../Pictures/Pictures";

const PawsForm = () => {
  const [lostOrFound, setLostorFound] = useState("Lost");
  const [picture, setPicture] = useState("");
  const [animal, setAnimal] = useState("Dog");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");

  const {
    user: { email },
    getAccessTokenSilently,
  } = useAuth0();
  const history = useHistory();

  async function postPawHandler(
    lostOrFound,
    picture,
    animal,
    description,
    location,
    lat,
    long
  ) {
    const token = await getAccessTokenSilently();
    ApiService.postPaws({
      lostOrFound,
      picture,
      animal,
      description,
      location,
      lat,
      long,
      token,
      email,
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!description && !picture && !location) {
      alert("please fill in all the fields");
      return;
    }
    postPawHandler(
      lostOrFound,
      picture,
      animal,
      description,
      location,
      +lat,
      +long
    );
    setPicture("");
    setDescription("");
    setLocation("");
  };

  return (
    <div>
      <header className="form-header">
        <h1 className="title-header"> LOST or FOUND PAWS </h1>
        <div className="login-logo">
          <FaHome size={30} onClick={() => history.push("/")} />
        </div>
      </header>
      <div className="form-container">
        <form className="add-form" onSubmit={handleSubmit}>
          {/* ------------choose if you lost a pet or found a lost one-------------------------- */}
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
          {/*------------------------ add a picture------------------------------------------ */}
          <div className="form-control">
            <label>Picture</label>
            <PicturesUpload setPicture={setPicture} />
          </div>
          {/* -------------------------------choose what kind of animal it is-------------------------- */}
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
          {/* ---------------------add a description of the animal and any other details------------------- */}
          <div className="form-control">
            <label>Description</label>
            <input
              type="text"
              placeholder="more details..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          {/* -----------------------choose the location you lost or found the pet------------------------------ */}
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
