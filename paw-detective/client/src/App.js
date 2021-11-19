import "./styles/App.css";

import { useAuth0 } from "@auth0/auth0-react";
import { Routes, Route } from "react-router-dom";
import { useLoadScript } from "@react-google-maps/api";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';

import ApiService from "./services/ApiService";
import GlobalContext from "./services/globalContext";
import { storage } from "./services/firebaseConfig";
// import { addTodo, completed, decrement, increment } from './actions'; //actions to dispatch

import Dashboard from "./components/Dashboard/Dashboard";
import PawsProfile from "./components/PawsProfile/PawsProfile";
import PawsForm from "./components/PawsForm/PawsForm";
// import ProtectedRoute from "./components/auth/Protected-route";

function App() {




  // const {
  //   user: { email },
  //   getAccessTokenSilently,
  // } = useAuth0();

  const { user, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    getAllPaws();
  }, []);

  ////////////////////////
  ///////STATES///////////
  ////////////////////////
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);

  const [animalForm, setAnimal] = useState({
    lostOrFound: false,
    picture: "",
    animal: "",
    description: "",
    location: "",
    lat: "",
    long: ""
  });

  const [marker, setMarker] = useState(null);
  const [selected, setSelected] = useState(null);

  const [paws, setPaws] = useState([]);
  const [filteredPaws, setFilteredPaws] = useState([]);

  console.log(paws)
  console.log(filteredPaws)
  ///////////////////////////
  ///////FUNCTIONS///////////
  ///////////////////////////
  const handleChange = (e) => {
    if (e.target.files[0]) {
      formHandler (e)
    }
  };
  const handleUpload = () => { //This one needs firebase config to upload pictures
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
              formHandler(url);
            });
        }
      );
    }
  };

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
      // email,
    });
  }
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!animalForm.description && !animalForm.picture && !animalForm.location) {
      alert("please fill in all the fields");
      return;
    }
    postPawHandler(animalForm);
    setAnimal({
      lostOrFound: false,
      picture: "",
      animal: "",
      description: "",
      location: "",
      lat: "",
      long: ""
    });
  };

  const filterPaws = (lostOrFound) => {
    if (lostOrFound === "Lost") {
      const lostList = paws.filter((paw) => paw.lostOrFound === lostOrFound);
      return setFilteredPaws(lostList);
    }
    if (lostOrFound === "Found") {
      const foundList = paws.filter((paw) => paw.lostOrFound === lostOrFound);
      return setFilteredPaws(foundList);
    }
    return setFilteredPaws(paws);
  };

  const deletePawsHandler = async () => {
    await ApiService.deletePaws(paws[0]._id);
    setPaws((prev) =>
      prev.filter((notDeletedPaw) => notDeletedPaw._id !== paws._id)
    );
    setFilteredPaws((prev) =>
      prev.filter((notDeletedPaw) => notDeletedPaw._id !== paws._id)
    );
  };

  const getAllPaws = () => {
    ApiService.getPaws().then((paws) => {
      const sortedPaws = paws.sort((a, b) => {
        const pawA = new Date(a.date).getTime();
        const pawB = new Date(b.date).getTime();
        return pawB - pawA;
      });
      setPaws(sortedPaws);
      setFilteredPaws(sortedPaws);
    });
  };

  ///////////////////////////
  ///////Custom Fn///////////
  ///////////////////////////
  const formHandler = (e) => {
    //We just need to work on the lat,long that come from Map.js
    console.log(e)
    const name = e.target.name;
    let value = e.target.value;
    console.log(name, value)
    if (name === 'lostOrFound') {
      if (value === 'Lost') {
        value = true
      } else {
        value = false
      }
    }
    if (name === 'picture') {
      value = e.target.files[0]
    }
    const animal = {...animalForm}

    animal[name] = value
    setAnimal(animal)
  }


  ///////////////////////////
  /////////EXTRAS////////////
  ///////////////////////////
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_PLACES_API_KEY,
  });

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";

  ////////////////////////////
  /////////CONTEXT////////////
  ///////////////////////////
  //This is gonna be a massive object and component (Whoever wants to implement redux or modularize functions, here's your time to shine)
  const customProps = {
    image,
    url,
    progress,
    handleChange,
    handleUpload,//States + fn from Pictures Component

    animalForm,
    formHandler,
    handleSubmit, //States + fn from PawsForm Component

    marker,
    selected,
    setMarker,
    setSelected, //States from Map Component

    paws,
    filteredPaws,
    filterPaws, //States + fn from Dashboard Component

    deletePawsHandler,
    setPaws,
    setFilteredPaws, //Fn from PawsItem Component
  };

  return (
    <GlobalContext.Provider value={{ customProps }}>
      <div className="App">
        <Routes>
          <Route path="/" element={<Dashboard/>} />

          <Route exact path="/profile/:id" element={<PawsProfile/>} key={document.location.href} />

          <Route exact path="/form" element={<PawsForm/>} />

          {/* <ProtectedRoute exact path="/form" component={PawsForm} /> */}
        </Routes>
      </div>
    </GlobalContext.Provider>
  );
}

export default App;
