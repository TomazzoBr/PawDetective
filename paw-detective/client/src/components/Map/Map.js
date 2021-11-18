import "./../../styles/Map.css";

import { GoogleMap, InfoWindow } from "@react-google-maps/api";

import { formatRelative } from "date-fns";
import { FaLocationArrow } from "react-icons/fa";

import { useCallback, useState, useRef, useContext } from "react";

import MapMarker from "./MapMarker";
import globalContext from '../../services/globalContext'

const Map = ({ setLat, setLong, profileMarker, pawsArray }) => {

  const {customProps} = useContext(globalContext);
  const {marker, selected} = customProps;

  const mapRef = useRef();

  const markersArray =
    pawsArray &&
    pawsArray.length &&
    pawsArray.map((paw) => (
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

  const onMapClick = useCallback( //Why use callback instead of just making a cb call?
    (e) => {
      setMarker(() => ({
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
        time: new Date(),
      }));
      if (setLat && setLong) {
        setLat(e.latLng.lat());
        setLong(e.latLng.lng());
      }
    },
    [setLat, setLong]
  );

  const mapContainerStyle = {
    width: "25em",
    height: "25em",
  };

  const center = {
    lat: 53.349804,
    lng: -6.26031,
  };

  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);

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
        onClick={onMapClick}
        onLoad={onMapLoad}
      >
        {markersArray}
        {!pawsArray && !profileMarker && marker ? (
          <MapMarker marker={marker} setSelected={setSelected} />
        ) : null}

        {profileMarker ? (
          <MapMarker marker={profileMarker} setSelected={setSelected} />
        ) : null}
        {selected ? (
          <InfoWindow
            position={{ lat: selected.lat, lng: selected.lng }}
            onCloseClick={() => {
              setSelected(null);
            }}
          >
            <div>
              <h2>Lost Paws!</h2>
              <p style={{ color: "blue" }}>
                Time: {formatRelative(selected.time, new Date())}
              </p>
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </div>
  );
};

export default Map;
