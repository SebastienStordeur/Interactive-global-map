import { FC, useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import DensityLayer from "./Layers/DensityLayer";
import popData from "../../data/country-by-population-density.json";
import temperaturesData from "../../data/country-by-yearly-average-temperature.json";
import TemperatureLayer from "./Layers/TemperatureLayer";
import globalPopulationData from "../../data/country-by-population.json";
import GlobalPopulationLayer from "./Layers/GlobalPopulationLayer";

interface MapProps {
  coordinate: number[];
}

const Map: FC<MapProps> = ({ coordinate }) => {
  const [geoData, setGeoData] = useState<any>(null);
  const [layerActive, setLayerActive] = useState(false);
  const center: [number, number] = coordinate.length === 2 ? [coordinate[0], coordinate[1]] : [51.505, -0.09];

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
      center={center}
      zoom={2}
      scrollWheelZoom={true}
      minZoom={2}
      maxZoom={6}
      zoomControl={true}
      dragging={false}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer noWrap={true} url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {/* {geoData && popData && <DensityLayer geoData={geoData} popData={popData} />} */}
      {/*  {temperaturesData && geoData && <TemperatureLayer geoData={geoData} tempData={temperaturesData} />} */}

      {geoData && globalPopulationData && <GlobalPopulationLayer geoData={geoData} populationData={globalPopulationData} />}
    </MapContainer>
  );
};

export default Map;
