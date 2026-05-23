import { GeoJsonLayer } from "@deck.gl/layers";
import { McdStationFeatureCollection } from "../../../entities/geoObject/types";

type Props = {
  data?: McdStationFeatureCollection;
  onClick: (info: { object?: any; x: number; y: number }) => void;
};

export const createMcdLayer = ({ data, onClick }: Props) => {
  if (!data) return null;

  return new GeoJsonLayer({
    id: "mck-layer",
    data,
    filled: true,
    pointRadiusMinPixels: 6,
    getFillColor: [0, 255, 0],
    pickable: true,
    autoHighlight: true,
    onClick,
  });
};
