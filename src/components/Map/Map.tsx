import { FC, useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import DensityLayer from "./Layers/DensityLayer";
/* import geoData from "../../data/world-population.geo.geojson";
import popData from "../../data/world-population.geo.json";
import useEffect from 'react';
 */
import popData from "../../data/country-by-population-density.json";

interface MapProps {
  coordinate?: number[];
}

const Map: FC<MapProps> = ({ coordinate }) => {
  const [geoData, setGeoData] = useState<any>(null);
  const center = [51.505, -0.09];

  useEffect(() => {
    fetch("/data/world-population.geo.geojson")
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        console.log("DATA", data);
        setGeoData(data);
      })
      .catch((error) => console.log(error));
  }, []);

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
      {geoData && popData && <DensityLayer geoData={geoData} popData={popData} />}
    </MapContainer>
  );
};

export default Map;
