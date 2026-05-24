import {
  McdStationFeatureCollection,
  McdStationFeatureCollectionDTO,
  MckStationFeatureCollection,
  MckStationFeatureCollectionDTO,
  MetroStationFeatureCollection,
  MetroStationFeatureCollectionDTO,
  RoadSegmentFeatureCollection,
  RoadSegmentFeatureCollectionDTO,
  TramStopFeatureCollection,
  TramStopFeatureCollectionDTO,
} from "./types";

export const busTramStopsTransformer = (
  data: TramStopFeatureCollectionDTO,
): TramStopFeatureCollection => ({
  ...data,
  features: data.features.map((item) => ({
    ...item,
    properties: {
      name: item.properties.name_mpv,
      type: "busTramStop",
      description: [
        item.properties.rayon,
        item.properties.ao,
        item.properties.address_mpv,
      ].join(", "),
      x: Number(item.properties.x),
      y: Number(item.properties.y),
    },
  })),
});

export const metroTransformer = (
  data: MetroStationFeatureCollectionDTO,
): MetroStationFeatureCollection => ({
  ...data,
  features: data.features.map((item) => ({
    ...item,
    properties: {
      name: item.properties.name_station,
      type: "metro",
      description: [
        item.properties.name_line,
        item.properties.status,
        item.properties.administrative_district,
      ].join(", "),
      x: item.properties.longitude,
      y: item.properties.latitude,
    },
  })),
});

export const mckTransformer = (
  data: MckStationFeatureCollectionDTO,
): MckStationFeatureCollection => ({
  ...data,
  features: data.features.map((item) => ({
    ...item,
    properties: {
      name: item.properties.name_station,
      type: "mck",
      description: [
        item.properties.name_line,
        item.properties.status,
        item.properties.administrative_district,
      ].join(", "),
      x: item.properties.longitude,
      y: item.properties.latitude,
    },
  })),
});

export const mcdTransformer = (
  data: McdStationFeatureCollectionDTO,
): McdStationFeatureCollection => ({
  ...data,
  features: data.features.map((item) => ({
    ...item,
    properties: {
      name: item.properties.name_station,
      type: "mcd",
      description: [
        item.properties.name_line,
        item.properties.status,
        item.properties.administrative_district,
      ].join(", "),
      x: item.properties.longitude,
      y: item.properties.latitude,
    },
  })),
});

export const streetsTransformer = (
  data: RoadSegmentFeatureCollectionDTO,
): RoadSegmentFeatureCollection => ({
  ...data,
  features: data.features.map((item) => ({
    ...item,
    properties: {
      name: item.properties.ST_NAME,
      type: "street",
      description: item.properties.ST_NM_CITY,
    },
  })),
});
