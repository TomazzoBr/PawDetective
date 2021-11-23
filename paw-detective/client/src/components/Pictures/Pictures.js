import "./../../styles/Pictures.scss";
import { useContext } from "react";

import globalContext from "../../services/globalContext";
import { useDispatch } from "react-redux";
import { setImage } from "../../actions/index";

const PicturesUpload = () => {
  const dispatch = useDispatch();

  const { customProps } = useContext(globalContext);
  const { url, progress, handleUpload } = customProps;

  return (
    <div className="pictures-container">
      <div>
        <progress value={progress} max="100" />
      </div>
      <div id="fb-picture">
        <input
          type="file"
          name="picture"
          onChange={(e) => dispatch(setImage(e))}
        />
      </div>
      <div>
        <img
          className="pet-picture"
          src={url || "https://www.turnkeytec.com/wp-content/uploads/2020/07/placeholder-image-400x300.jpg"}
          alt="firebase-pic"
        />
      </div>

      <button className="pictures-button" onClick={() => handleUpload()}>
        Upload Picture
      </button>
    </div>
  );
};

export default PicturesUpload;
