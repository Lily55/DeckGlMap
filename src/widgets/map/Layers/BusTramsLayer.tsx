import { GeoJsonLayer } from "@deck.gl/layers";
import { TramStopFeatureCollection } from "../../../shared/api/types";

type Props = {
  data?: TramStopFeatureCollection;
  onClick: (info: { object?: any; x: number; y: number }) => void;
};

export const createBusTramsLayer = ({ data, onClick }: Props) => {
  if (!data) return null;

  return new GeoJsonLayer({
    id: "mck-layer",
    data,
    filled: true,
    pointRadiusMinPixels: 6,
    getFillColor: [255, 0, 0],
    pickable: true,
    autoHighlight: true,
    onClick,
  });
};
