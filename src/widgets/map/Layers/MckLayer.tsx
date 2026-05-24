import { GeoJsonLayer } from "@deck.gl/layers";
import { MckStationFeatureCollection } from "../../../shared/api/types";

type Props = {
  data?: MckStationFeatureCollection;
  onClick: (info: { object?: any; x: number; y: number }) => void;
};

export const createMckLayer = ({ data, onClick }: Props) => {
  if (!data) return null;

  return new GeoJsonLayer({
    id: "mck-layer",
    data,
    filled: true,
    pointRadiusMinPixels: 6,
    getFillColor: [0, 128, 255],
    pickable: true,
    autoHighlight: true,
    onClick,
  });
};
