import React, { FC, useEffect, useRef } from "react";
import * as d3 from "d3";
import { useMap } from "react-leaflet";
import { LatLng } from "leaflet";

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

interface DensityLayerProps {
  geoData: {
    type: string;
    features: GeoData[];
  };
  popData: {
    [key: string]: number;
  };
}

const DensityLayer: FC<DensityLayerProps> = ({ geoData, popData }) => {
  const map = useMap();
  const d3Container = useRef<SVGSVGElement | null>(null);

  function getPopulationDensity(feature: GeoData): number | undefined {
    return popData[feature.properties.name];
  }

  useEffect(() => {
    if (geoData && popData && d3Container.current) {
      const projectPoint = (lon: number, lat: number) => {
        let point = map.latLngToLayerPoint(new LatLng(lat, lon));
        (this as any).stream.point(point.x, point.y);
      };

      const svg = d3.select(d3Container.current);

      // Create D3 geoPath
      let transform = d3.geoTransform({ point: projectPoint });
      let d3path = d3.geoPath().projection(transform);

      let colorScale = d3.scaleSequential(d3.interpolateReds).domain([0, d3.max(Object.values(popData), (d: any) => d)]);

      const update = svg.selectAll("path").data(geoData.features);

      //new paths
      update
        .enter()
        .append("path")
        .attr("fill", (d: GeoData) => colorScale(getPopulationDensity(d)) || "");

      //update existing paths
      update.attr("fill", (d: GeoData) => colorScale(getPopulationDensity(d)) || "");

      function updatePaths() {
        update.attr("d", d3path);
      }
    }
  });

  return <div>DensityLayer</div>;
};

export default DensityLayer;
