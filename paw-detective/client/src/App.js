import "./styles/App.css";

import { useAuth0 } from "@auth0/auth0-react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useLoadScript } from "@react-google-maps/api";

import { useState, useEffect } from "react";

import { useSelector, useDispatch } from 'react-redux';
import { action1, action2 } from './actions/index'

import ApiService from "./services/ApiService";
import GlobalContext from "./services/globalContext";
import { storage } from "./services/firebaseConfig";

import Dashboard from "./components/Dashboard/Dashboard";
import PawsForm from "./components/PawsForm/PawsForm";
// import ProtectedRoute from "./components/auth/Protected-route";

function App() {
  // const {
  //   user: { email },
  //   getAccessTokenSilently,
  // } = useAuth0();

  const { user, getAccessTokenSilently } = useAuth0();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  ////////////////////////
  ///////STATES///////////
  ////////////////////////
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);

  const [animalForm, setAnimal] = useState({
    lostOrFound: false,
    picture: "",
    animal: "Dog",
    description: "",
    location: "",
    lat: 0,
    long: 0
  });

  const [marker, setMarker] = useState(null);
  const [selected, setSelected] = useState(null);

  const [paws, setPaws] = useState([]);
  const [filterBtn, setFilterBtn] = useState('All');

  // const filter = useSelector(state => state.filterBtn);
  // const dispatch = useDispatch();

  // I set is as string just cause key (id) will be an string too
  // But we should work with another key instead of ._id
  const [selectedAnimal, setSelectedAnimal] = useState("0");

  ////////////////////////
  ///////HOOKS///////////
  ////////////////////////

  useEffect(() => {
    getAllPaws();
    mapAlert();
  }, [paws]);

  ///////////////////////////
  ///////FUNCTIONS///////////
  ///////////////////////////
  const handleChange = (e) => {
    if (e.target.files[0]) {
      formHandler(e)
    }
  };
  const handleUpload = (e) => { //This one needs firebase config to upload pictures
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

  async function postPawHandler(data) {
    const token = "masterKey"
    // const token = await getAccessTokenSilently();
    ApiService.postPaws(data, token); //We still miss the email form somehow
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
      animal: "Dog",
      description: "",
      location: "",
      lat: 0,
      long: 0
    });
    navigate("/")
  };

  const deletePawsHandler = async (key) => {
    console.log(paws, key);
    await ApiService.deletePaws(key); //key is ._id
    const newPaws = paws.filter(paw => paw._id !== paws._id)

    setPaws(newPaws);
  };

  const getAllPaws = () => {
    ApiService.getPaws()
      .then((paws) => {
        if (paws) {
          const sortedPaws = paws.sort((a, b) => {
            const pawA = new Date(a.date).getTime();
            const pawB = new Date(b.date).getTime();
            return pawB - pawA;
          });
          setPaws(sortedPaws)
        } else {
          setPaws([]);
        }
      });
  };

  ///////////////////////////
  ///////Custom Fn///////////
  ///////////////////////////
  const formHandler = (e) => {
    //We just need to work on the lat,long that come from Map.js
    if (e && !e.target) {
      const newImage = Object.assign({}, image);
      newImage.name = e;
      setImage(newImage);
      const newAnimal = Object.assign({}, animalForm);
      newAnimal.picture = e;
      setAnimal(newAnimal)
    }
    else {
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
        value = e.target.files[0].name;
        setImage(e.target.files[0])
      }
      const animal = {...animalForm}

      animal[name] = value
      setAnimal(animal)
    }
  }
  const changeAnimalModal = (id) => {
    window.scrollTo(0, 0);
    setSelectedAnimal(id)
  }
  const changeFilter = (flag) => {
    setFilterBtn(flag)
  }

  ///////////////////////////
  /////////EXTRAS////////////
  ///////////////////////////
  const mapAlert = () => {
    if(process.env.REACT_APP_GOOGLE_MAPS_API_KEY.length > 0) alert('BE CAREFUL YOU HAVE MAPS API WORKING')
  }

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });
  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";

  ////////////////////////////
  /////////CONTEXT////////////
  ///////////////////////////
  //This is gonna be a massive object and component (Whoever wants to implement redux or modularize functions, here's your time to shine)
  const customProps = {
    // states
    image,
    url,
    progress, // Pictures Component
    animalForm, //PawsForm Component
    marker,
    selected, //Map Component
    paws, //Dashboard Component
    selectedAnimal, //PawsProfile Component
    filterBtn, //PawsItem Component
    // functions
    handleChange,
    handleUpload, //Pictures Component
    formHandler,
    handleSubmit, //PawsForm Component
    setMarker,
    setSelected, //Map Component
    deletePawsHandler,
    changeFilter, // PawsItem Component
    changeAnimalModal, //PawsProfile Component
  };

  return (
    <GlobalContext.Provider value={{ customProps }}>
      <div className="App">
        <Routes>
          <Route path="/" element={<Dashboard/>} />

          {/* <Route exact path="/profile/:id" element={<PawsProfile/>} key={document.location.href} /> */}

          <Route exact path="/form" element={<PawsForm/>} />

          {/* <ProtectedRoute exact path="/form" component={PawsForm} /> */}
        </Routes>
      </div>
    </GlobalContext.Provider>
  );
}

export default App;
