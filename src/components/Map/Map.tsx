import { FC } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface MapProps {
  coordinate?: number[];
}

const Map: FC<MapProps> = ({ coordinate }) => {
  const center = [51.505, -0.09];
  return (
    <MapContainer center={coordinate || center} zoom={2} scrollWheelZoom={true} minZoom={2} maxZoom={6} style={{ height: "80%", width: "100%" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={center}></Marker>
    </MapContainer>
  );
};

export default Map;
