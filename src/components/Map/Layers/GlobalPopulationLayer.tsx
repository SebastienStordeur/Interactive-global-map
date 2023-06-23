import * as d3 from "d3";
import { LatLng } from "leaflet";
import { FC, useEffect, useRef } from "react";
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

interface PopulationData {
  country: string;
  population: number;
}

interface PopulationLayerProps {
  geoData: {
    type: string;
    /* features: any[]; */
    features: GeoJsonFeature[];
  };
  populationData: PopulationData[];
}

const GlobalPopulationLayer: FC<PopulationLayerProps> = ({ geoData, populationData }) => {
  console.log(geoData);
  const map = useMap();
  const d3Container = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    function getPopulationPerCountry(feature: GeoData): number {
      const countryData = populationData.find((data: { country: string; population: number }) => data.country === feature.properties.NAME);
      return countryData ? +countryData.population : 0;
    }

    const svg = d3.select(d3Container.current);
    const transform = d3.geoTransform({
      point: function (x, y) {
        const point = map.latLngToLayerPoint(new LatLng(y, x));
        this.stream.point(point.x, point.y);
      },
    });

    const d3Path = d3.geoPath().projection(transform);
    let populations = populationData.map((t) => t.population).filter((pop): pop is number => pop !== null);
    let maxPopulation = d3.quantile(populations.sort(d3.ascending), 0.99) || 0;
    let colorScale = d3.scaleSequential(d3.interpolateReds).domain([0, maxPopulation]);

    const update = svg.selectAll("path").data(geoData.features);
    update
      .enter()
      .append("path")
      .attr("fill", (data: GeoData) => {
        const color = colorScale(getPopulationPerCountry(data));
        console.log(color);
        return color;
      });

    function updatePaths() {
      update.attr("d", (d) => d3Path(d));
    }

    map.on("moveend", updatePaths);
    updatePaths();

    return () => {
      map.off("moveend", updatePaths);
    };
  }, [map, geoData, populationData, d3Container.current]);

  return <svg ref={d3Container} className="layer" />;
};

export default GlobalPopulationLayer;
