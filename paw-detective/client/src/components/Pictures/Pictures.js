import "./../../styles/Pictures.css";
import { useContext } from "react";

import globalContext from '../../services/globalContext'
import { useDispatch } from 'react-redux';
import { setImage } from '../../actions/index'

const PicturesUpload = () => {

  const dispatch = useDispatch();

  const {customProps} = useContext(globalContext)
  const {url, progress, handleUpload} = customProps;

  return (
    <div>
      <div>
        <progress value={progress} max="100" />
      </div>
      <input type="file" name="picture" onChange={(e)=>dispatch(setImage(e))} />

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
