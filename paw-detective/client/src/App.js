import "./styles/App.css";

import { useAuth0 } from "@auth0/auth0-react";
import { Route, Switch } from "react-router-dom";
import { useLoadScript } from "@react-google-maps/api";
import { useState, useEffect } from "react";

import GlobalContext from './services/globalContext';
import ApiService from './services/ApiService'
import { storage } from "./services/firebaseConfig";

import Dashboard from "./components/Dashboard/Dashboard";
import PawsProfile from "./components/PawsProfile/PawsProfile";
import PawsForm from "./components/PawsForm/PawsForm";
import ProtectedRoute from "./components/auth/Protected-route";

function App() {

  // const {
  //   user: { email },
  //   getAccessTokenSilently,
  // } = useAuth0();

  const {
    user,
    getAccessTokenSilently,
  } = useAuth0();

  useEffect(() => {
    getAllPaws()
  },[]);

  ////////////////////////
  ///////STATES///////////
  ////////////////////////
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);

  const [lostOrFound, setLostorFound] = useState("Lost");
  const [picture, setPicture] = useState("");
  const [animal, setAnimal] = useState("Dog");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");

  const [marker, setMarker] = useState(null);
  const [selected, setSelected] = useState(null);

  const [paws, setPaws] = useState([]);
  const [filteredPaws, setFilteredPaws] = useState([]);
  ///////////////////////////
  ///////FUNCTIONS///////////
  ///////////////////////////
  const handleChange = (event) => {
    if (event.target.files[0]) {
      setImage(event.target.files[0]);
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
              setPicture(url);
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
    image, url, progress, handleChange, handleUpload, setPicture, //States + fn from Pictures Component
    lostOrFound, animal, description, location,
    handleSubmit, setLostorFound, setAnimal, setLocation, setDescription,//States + fn from PawsForm Component
    marker, selected, setLat, setLong, setMarker, setSelected, //States from Map Component
    paws, filteredPaws, filterPaws, //States + fn from Dashboard Component
    deletePawsHandler, setPaws, setFilteredPaws  //Fn from PawsItem Component
  }

  return (
    <GlobalContext.Provider value = {{customProps}} >
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Dashboard />
          </Route>
          <Route exact path="/profile/:id" key={document.location.href}> {/* Pass key but props arent used in that component */}
            <PawsProfile />
          </Route>

          <Route exact path="/form" key={document.location.href}> {/* Pass key but props arent used in that component */}
            <PawsForm />
          </Route>

          {/* <ProtectedRoute exact path="/form" component={PawsForm} /> */}
        </Switch>
      </div>
    </GlobalContext.Provider>
  );
}

export default App;
