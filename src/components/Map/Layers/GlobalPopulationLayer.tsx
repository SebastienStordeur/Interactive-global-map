import d3 from "d3";
import { FC, useEffect, useRef } from "react";
import { useMap } from "react-leaflet";

interface GeoData {
  type: string;
  properties: {
    [key: string]: any;
  };
  geometry: {
    type: string;
    coordinates: number[][][];
  };
}

interface PopulationData {
  country: string;
  population: number;
}

interface PopulationLayerProps {
  geoData: {
    type: string;
    features: any[];
  };
  populationData: PopulationData[];
}

const GlobalPopulationLayer: FC<PopulationLayerProps> = ({ geoData, populationData }) => {
  const map = useMap();
  const d3Container = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    function getPopulationPerCountry(feature: GeoData): number {
      const countryData = populationData.find((data: { country: String; population: number }) => {
        data.country === feature.properties.NAME;
      });
      return countryData ? +countryData.population : 0;
    }

    const svg = d3.select(d3Container.current);
    const transform = d3.geoTransform({});
  }, []);

  return <svg className="layer" />;
};

export default GlobalPopulationLayer;
