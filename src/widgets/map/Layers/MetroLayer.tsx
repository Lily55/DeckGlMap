import { GeoJsonLayer } from "@deck.gl/layers";
import { MetroStationFeatureCollection } from "../../../shared/api/types";

type Props = {
  data?: MetroStationFeatureCollection;
  onClick: (info: { object?: any; x: number; y: number }) => void;
};

export const createMetroLayer = ({ data, onClick }: Props) => {
  if (!data) return null;

  return new GeoJsonLayer({
    id: "mck-layer",
    data,
    filled: true,
    pointRadiusMinPixels: 6,
    getFillColor: [255, 255, 0],
    pickable: true,
    autoHighlight: true,
    onClick,
  });
};
