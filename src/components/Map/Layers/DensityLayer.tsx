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

interface DensityLayerProps {
  geoData: {
    type: string;
    features: /* GeoData[]; */ any[];
  };
  popData: {
    [key: string]: number;
  };
}

const DensityLayer: FC<DensityLayerProps> = ({ geoData, popData }) => {
  const map = useMap();
  const d3Container = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (geoData && popData && d3Container.current) {
      const projectPoint = (lon: number, lat: number) => {
        let point = map.latLngToLayerPoint(new LatLng(lat, lon));
        (this as any).stream.point(point.x, point.y);
      };

      function getPopulationDensity(feature: GeoData): number {
        return popData[feature.properties.name] ?? 0;
      }
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
        .attr("fill", (d: GeoData) => colorScale(getPopulationDensity(d)) || 0);

      //update existing paths
      update.attr("fill", (d: GeoData) => colorScale(getPopulationDensity(d)) || 0);

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
