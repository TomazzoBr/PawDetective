import { Marker } from "@react-google-maps/api";
import image from "../../assets/images/paw-map.png"

const MapMarker = ({ marker, setSelected }) => {
  return (
    <Marker
      key={marker.time}
      position={{ lat: marker.lat, lng: marker.lng }}
      icon={{
        url: image,
        scaledSize: new window.google.maps.Size(30, 30),
        origin: new window.google.maps.Point(0, 0),
        anchor: new window.google.maps.Point(15, 15),
      }}
      onClick={() => {
        setSelected(marker);
      }}
    />
  );
};
export default MapMarker;
