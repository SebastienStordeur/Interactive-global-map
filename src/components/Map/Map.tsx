import { FC, useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import densityData from "../../data/country-by-population-density.json";
import temperaturesData from "../../data/country-by-yearly-average-temperature.json";
import globalPopulationData from "../../data/country-by-population.json";

import Layer from "./Layers/Layer";

interface MapProps {
  coordinate: number[];
  layer: {
    isVisible: boolean;
    layer: string | null;
  };
}

const Map: FC<MapProps> = ({ coordinate, layer }) => {
  const [geoData, setGeoData] = useState<any>(null);
  const center: [number, number] =
    coordinate.length === 2 ? [coordinate[0], coordinate[1]] : [51.505, -0.09];

  useEffect(() => {
    fetch("/data/world-population.geo.geojson")
      .then((response) => {
        return response.json();
      })
      .then((data) => setGeoData(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <MapContainer
      center={center}
      zoom={2}
      scrollWheelZoom={true}
      minZoom={2}
      maxZoom={6}
      zoomControl={false}
      dragging={false}
      style={{ height: "85%", width: "75%", margin: "auto", marginTop: "40px" }}
    >
      <TileLayer
        noWrap={true}
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {geoData !== null &&
        layer.layer === "temperature" &&
        temperaturesData && (
          <Layer geoData={geoData} data={temperaturesData} type="temperature" />
        )}
      {geoData && layer.layer === "population" && globalPopulationData && (
        <Layer
          geoData={geoData}
          data={globalPopulationData}
          type="population"
        />
      )}
      {geoData && layer.layer === "density" && densityData && (
        <Layer geoData={geoData} data={densityData} type="density" />
      )}
    </MapContainer>
  );
};

export default Map;
