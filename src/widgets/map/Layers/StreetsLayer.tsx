import { GeoJsonLayer } from "@deck.gl/layers";
import { RoadSegmentFeatureCollection } from "../../../shared/api/types";

type Props = {
  data?: RoadSegmentFeatureCollection;
  onClick: (info: { object?: any; x: number; y: number }) => void;
};

export const createStreetsLayer = ({ data, onClick }: Props) => {
  if (!data) return null;

  return new GeoJsonLayer({
    id: "roads-layer",
    data,
    coordinateSystem: "cartesian",
    stroked: true,
    filled: false,
    lineWidthUnits: "pixels",
    getLineWidth: (f: any) => f.properties.Width || 3,
    getLineColor: [127, 255, 212, 100],
    lineWidthMinPixels: 2,
    pickable: true,
    autoHighlight: true,
    onClick,
  });
};
