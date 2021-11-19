import "../../styles/Maps.css";

import { GoogleMap, InfoWindow } from "@react-google-maps/api";

import { formatRelative } from "date-fns";
import { FaLocationArrow } from "react-icons/fa";

import { useCallback, useRef, useContext } from "react";

import MapMarker from "./MapMarker";
import globalContext from '../../services/globalContext'

const Map = ({profileMarker}) => {

  const {customProps} = useContext(globalContext);
  const {paws, marker, selected,
    setMarker, setSelected, 
    animalForm, formHandler //for lat and long
  } = customProps;

  const {lat,long} = animalForm;

  const mapRef = useRef();

  const markersArray =
    paws &&
    paws.length &&
    paws.map((paw) => (
      <MapMarker
        key={paw._id}
        setSelected={setSelected}
        marker={{
          lat: paw.lat,
          lng: paw.long,
          time: new Date(paw.date),
        }}
      />
    ));

  const onMapClick = (e) => {
    setMarker(() => ({
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
      time: new Date(),
    }));
    if (lat && long) {
      formHandler(e.latLng.lat());
      formHandler(e.latLng.lng());
    }
  }
  const onMapLoad = (map) => {
    mapRef.current = map;
  }

  // const onMapClick = useCallback( //Why use callback instead of just making a cb call?
  //   (e) => {
  //     setMarker(() => ({
  //       lat: e.latLng.lat(),
  //       lng: e.latLng.lng(),
  //       time: new Date(),
  //     }));
  //     if (setLat && setLong) {
  //       setLat(e.latLng.lat());
  //       setLong(e.latLng.lng());
  //     }
  //   },
  //   [setLat, setLong]
  // );

  // const onMapLoad = useCallback((map) => {
  //   mapRef.current = map;
  // }, []);
  const panTo = useCallback(({ lat, lng }) => {
      mapRef.current.panTo({ lat, lng });
      mapRef.current.setZoom(14);
  }, []);

  const mapContainerStyle = {
    width: "25em",
    height: "25em",
  };
  const center = {
    lat: 53.349804,
    lng: -6.26031,
  };

  const Locate = ({ panTo }) => {
    return (
      <button
        className="compass-button"
        onClick={() => {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              panTo({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              });
            },
            () => null
          );
        }}
      >
        <FaLocationArrow size={25} />
      </button>
    );
  };

  return (
    <div className="map-container">
      <Locate panTo={panTo} />

      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        center={
          profileMarker
            ? { lat: profileMarker.lat, lng: profileMarker.lng }
            : center
        }
        onClick={(e) => onMapClick(e)}
        onLoad={(map) => onMapLoad(map)}
      >
        {markersArray}

        {!paws && !profileMarker && marker
          ? (<MapMarker marker={marker} setSelected={setSelected} />)
          : null}

        {profileMarker
          ? (<MapMarker marker={profileMarker} setSelected={setSelected} />)
          : null}


        {selected
          ? (<InfoWindow
              position={{ lat: selected.lat, lng: selected.lng }}
              onCloseClick={() => {
                setSelected(null);
              }}
            >
            <div>
              <h2>Lost Paws!</h2>
              <p>
                Time: {formatRelative(selected.time, new Date())}
              </p>
            </div>
          </InfoWindow>)
          : null}

      </GoogleMap>
    </div>
  );
};

export default Map;
