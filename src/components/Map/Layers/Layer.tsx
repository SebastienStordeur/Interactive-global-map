import { FC, memo, useRef, useEffect } from "react";
import { useMap } from "react-leaflet";

interface GeoJsonFeature {
  geometries: d3.GeoGeometryObjects[];
  geometry: {
    coordinates: number[][][];
    type: string;
  };
  id: number;
  properties: {
    NAME: string;
    ISO_3_CODE: string;
    ISO_2_CODE: string;
    AREA: string;
    NAME_1: string;
    [key: string]: string;
  };
  type: string;
}

interface GeoData {
  type: string;
  properties: {
    [key: string]: string;
  };
  geometry: {
    type: string;
    coordinates: number[][][];
  };
}

interface Data {
  country: string;
  population?: number;
  density?: number | null;
  temperature?: number | null;
}

interface LayerProps {
  geoData: {
    type: string;
    features: GeoJsonFeature[];
  };
  data: Data[];
  type: DataProperty;
}

type DataProperty = "temperature" | "density" | "population";

const Layer: FC<LayerProps> = ({ geoData, data, type }) => {
  const map = useMap();
  const d3Container = useRef<SVGSVGElement | null>(null);

  function getDatas(feature: GeoData): number {
    const countryData = data.find((d: any) => d.country === feature.properties.NAME);
    return countryData && countryData[type] ? +countryData[type]! : 0;
  }

  useEffect(() => {}, []);

  return <svg ref={d3Container} className="layer" />;
};

export default memo(Layer);
