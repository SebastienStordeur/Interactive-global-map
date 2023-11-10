export type Geometry = {
  type: string;
  coordinates: number[][][];
};

export type GeoJsonProperties = {
  NAME: string;
  ISO_3_CODE: string;
  ISO_2_CODE: string;
  AREA: string;
  NAME_1: string;
  [key: string]: string;
};

export interface GeoData {
  type: string;
  properties: {
    [key: string]: any;
  };
  geometry: Geometry;
}
