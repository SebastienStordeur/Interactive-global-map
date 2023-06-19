import { FC } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

interface MapProps {
  coordinate?: number[];
}

const Map: FC<MapProps> = ({ coordinate }) => {
  const center = [51.505, -0.09];
  return (
    <MapContainer
      center={coordinate || center}
      zoom={2}
      scrollWheelZoom={true}
      minZoom={2}
      maxZoom={6}
      style={{ height: "100%", width: "100%", marginTop: "150px" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    </MapContainer>
  );
};

export default Map;
