import * as d3 from "d3";
import { LatLng } from "leaflet";
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

interface TemperatureData {
  country: string;
  temperature: number | null;
}

interface TemperatureLayerProps {
  geoData: {
    type: string;
    features: any[];
  };
  tempData: TemperatureData[];
}

const TemperatureLayer: FC<TemperatureLayerProps> = ({ geoData, tempData }) => {
  const map = useMap();
  const d3Container = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    function getAverageTemperatures(feature: GeoData): number {
      const countryData = tempData.find((data: { country: string; temperature: number | null }) => data.country === feature.properties.NAME);
      return countryData ? +countryData.temperature! : 0;
    }

    const svg = d3.select(d3Container.current);
    const transform = d3.geoTransform({
      point: function (x, y) {
        const point = map.latLngToLayerPoint(new LatLng(y, x));
        this.stream.point(point.x, point.y);
      },
    });

    let d3path = d3.geoPath().projection(transform);
    let temperatures = tempData.map((t) => t.temperature).filter((temperature): temperature is number => temperature !== null);
    let maxTemperature = d3.quantile(temperatures.sort(d3.ascending), 0.85) || 0;
    let colorScale = d3.scaleSequential(d3.interpolateTurbo).domain([0, maxTemperature]);

    const update = svg.selectAll("path").data(geoData.features);
    update
      .enter()
      .append("path")
      .attr("fill", (data: GeoData) => {
        const color = colorScale(getAverageTemperatures(data));
        return color;
      });

    function updatePaths() {
      update.attr("d", (d) => d3path(d));
    }

    map.on("moveend", updatePaths);
    updatePaths();

    return () => {
      map.off("moveend", updatePaths);
    };
  }, [map, geoData, tempData, d3Container.current]);
  return <svg ref={d3Container} className="layer" />;
};

export default TemperatureLayer;
