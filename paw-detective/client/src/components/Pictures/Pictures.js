import "./../../styles/Pictures.css";
import { useContext } from "react";
import { storage } from "./firebaseConfig";

import globalContext from '../../services/globalContext'

const PicturesUpload = ({ setPicture }) => {

  const {customProps} = useContext(globalContext)
  const {image, url, progress, handleChange, handleUpload} = customProps;

  return (
    <div>
      <div>
        <progress value={progress} max="100" />
      </div>
      <input type="file" onChange={()=>handleChange()} />

      <div>
        <img
          className="pet-picture"
          src={url || "http://via.placeholder.com/200x200"}
          alt="firebase-pic"
        />
      </div>
      <div className="pictures-button" onClick={()=>handleUpload()}>
        Upload Picture
      </div>
    </div>
  );
};

export default PicturesUpload;
