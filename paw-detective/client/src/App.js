import { useAuth0 } from "@auth0/auth0-react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useLoadScript } from "@react-google-maps/api";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { savePictureUrl, resetForm, closeModal } from "./actions/index";

import ApiService from "./services/ApiService";
import GlobalContext from "./services/globalContext";
import { storage } from "./services/firebaseConfig";

import Dashboard from "./components/Dashboard/Dashboard";
import PawsForm from "./components/PawsForm/PawsForm";
import Header from "./components/Dashboard/Header/Header";

function App() {
  const dispatch = useDispatch();

  const animalForm = useSelector((state) => state.form);
  const image = useSelector((state) => state.image);

  const { user, getAccessTokenSilently } = useAuth0();

  const navigate = useNavigate();

  ////////////////////////
  /////  STATES  /////////
  ////////////////////////

  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);

  const [marker, setMarker] = useState(null);
  const [selected, setSelected] = useState(null);

  const [paws, setPaws] = useState([]);

  ////////////////////////
  //////  HOOKS  /////////
  ////////////////////////

  useEffect(() => {
    getAllPaws();
    // mapAlert();
  }, [paws]);

  ///////////////////////////
  /////  FUNCTIONS  /////////
  ///////////////////////////

  const handleSubmit = (e) => {
    e.preventDefault();

    const { email } = user;
    const data = { ...animalForm, email };

    if (
      !animalForm.description &&
      !animalForm.picture &&
      !animalForm.location
    ) {
      alert("please fill in all the fields");
      return;
    }
    postPawHandler(data);
    dispatch(resetForm());
    setUrl("");
    setProgress(0);
    navigate("/");
  };

  ///////////////////////////
  ////////  API  ////////////
  /////  FUNCTIONS  /////////
  ///////////////////////////
  const getAllPaws = () => {
    ApiService.getPaws().then((paws) => {
      if (paws) {
        const sortedPaws = paws.sort((a, b) => {
          const pawA = new Date(a.date).getTime();
          const pawB = new Date(b.date).getTime();
          return pawB - pawA;
        });
        setPaws(sortedPaws);
      } else {
        setPaws([]);
      }
    });
  };

  async function postPawHandler(data) {
    const token = await getAccessTokenSilently();
    ApiService.postPaws(data, token); 
  }

  const deletePawsHandler = async (key) => {
    dispatch(closeModal());
    await ApiService.deletePaws(key);
    const newPaws = paws.filter((paw) => paw._id !== paws._id);

    setPaws(newPaws);
  };

  ////////////////////////////////////////////////
  //////////  FIREBASE PICTURE UPDATE  ///////////
  ////////////////////////////////////////////////
  const handleUpload = (e) => {
    e.preventDefault();
    if (image) {
      const uploadTask = storage.ref(`images/${image.name}`).put(image);
      uploadTask.on(
        "state_changed",
        //current progress of the file upload
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        (error) => {
          console.log(error);
        },
        () => {
          storage
            .ref("images")
            .child(image.name)
            .getDownloadURL()
            .then((url) => {
              setUrl(url);
              dispatch(savePictureUrl(url));
            });
        }
      );
    }
  };

  ///////////////////////////
  ///////  EXTRAS  //////////
  ///////////////////////////
  const mapAlert = () => {
    if (process.env.REACT_APP_GOOGLE_MAPS_API_KEY.length > 0)
      alert("BE CAREFUL YOU HAVE MAPS API WORKING");
  };

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });
  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";

  ////////////////////////////
  ///////  CONTEXT  //////////
  ///////////////////////////
  const customProps = {
    // states
    url,
    progress, // Pictures Component
    marker,
    selected, //Map Component
    paws, //Dashboard Component

    // functions
    handleUpload, //Pictures Component
    handleSubmit, //PawsForm Component
    setMarker,
    setSelected, //Map Component
    deletePawsHandler,
  };

  return (
    <GlobalContext.Provider value={{ customProps }}>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route exact path="/form" element={<PawsForm />} />
        </Routes>
      </div>
    </GlobalContext.Provider>
  );
}

export default App;
