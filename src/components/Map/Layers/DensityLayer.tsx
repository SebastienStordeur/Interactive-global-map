import { FC, useEffect, useRef } from "react";
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
        const countryData = popData.find((data: { country: string; density: number }) => data.country === feature.properties.NAME);
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
      let colorScale = d3.scaleSequential(d3.interpolateReds).domain([0, d3.max(popData, (d: any) => d.density)]);

      const update = svg.selectAll("path").data(geoData.features);

      console.log("Data to be used for paths:", geoData.features);

      //new paths
      update
        .enter()
        .append("path")
        .attr("fill", (d: GeoData) => {
          const color = "red"; /* colorScale(getPopulationDensity(d)); */
          console.log(`Color for ${d.properties.NAME}:`, color);
          return color;
        });

      //update existing paths
      //update.attr("fill", (d: GeoData) => colorScale(getPopulationDensity(d)));
      update.attr("fill", "red");

      function updatePaths() {
        update.attr("d", (d) => d3path(d));
      }

      map.on("moveend", updatePaths);
      updatePaths();
    }
  }, [map, geoData, popData, d3Container.current]);

  return <svg ref={d3Container} />;
};

export default DensityLayer;
