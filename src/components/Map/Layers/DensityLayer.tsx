import { FC, useEffect, useRef } from "react";
import * as d3 from "d3";
import { useMap } from "react-leaflet";
import { LatLng } from "leaflet";
import { GeoData } from "../../../types/types";

/* interface GeoData {
  type: string;
  properties: {
    [key: string]: any;
  };
  geometry: {
    type: string;
    coordinates: number[][][];
  };
} */

interface PopulationData {
  country: string;
  density: number;
}

interface DensityLayerProps {
  geoData: {
    type: string;
    features: /* GeoData[]; */ any[];
  };
  popData: PopulationData[];
}

const DensityLayer: FC<DensityLayerProps> = ({ geoData, popData }) => {
  const map = useMap();
  const d3Container = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (geoData && popData && d3Container.current) {
      function getPopulationDensity(feature: GeoData): number {
        const countryData = popData.find(
          (data: { country: string; density: number }) =>
            data.country === feature.properties.NAME
        );
        return countryData ? +countryData.density.toFixed(2) : 0;
      }

      const svg = d3.select(d3Container.current);

      // create D3 geoPath
      const transform = d3.geoTransform({
        point: function (x, y) {
          const point = map.latLngToLayerPoint(new LatLng(y, x));
          this.stream.point(point.x, point.y);
        },
      });

      let d3path = d3.geoPath().projection(transform);
      let densities = popData
        .map((d) => d.density)
        .filter((density): density is number => density !== undefined);
      let maxDensity = d3.quantile(densities.sort(d3.ascending), 0.85) || 0;
      let colorScale = d3
        .scaleSequential(d3.interpolateOrRd)
        .domain([0, maxDensity]);

      const update = svg.selectAll("path").data(geoData.features);
      //new paths
      update
        .enter()
        .append("path")
        .attr("fill", (d: GeoData) => {
          const color = colorScale(getPopulationDensity(d));
          return color;
        });

      //update existing paths
      update.attr("fill", (d: GeoData) => colorScale(getPopulationDensity(d)));

      function updatePaths() {
        update.attr("d", (d) => d3path(d));
      }

      map.on("moveend", updatePaths);
      updatePaths();

      return () => {
        map.off("moveend", updatePaths);
      };
    }
  }, [map, geoData, popData, d3Container.current]);

  return <svg ref={d3Container} className="layer" />;
};

export default DensityLayer;
