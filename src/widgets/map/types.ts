import { MapViewState } from "@deck.gl/core";

export interface CartesianViewState extends Omit<
  MapViewState,
  "longitude" | "latitude"
> {
  target: [number, number] | number[];
  zoom: number;
  bearing?: number;
  pitch?: number;
}
