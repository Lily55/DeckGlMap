import { RoadSegmentFeatureCollection } from "../../entities/geoObject/types";

export const fetchMckStations = async () => {
  const response = await fetch("mckStation.json");
  if (!response.ok) {
    throw new Error("Ошибка при загрузке данных");
  }
  return response.json();
};

export const fetchStreets = async (): Promise<RoadSegmentFeatureCollection> => {
  const response = await fetch("StreetsPedestrian.json");
  if (!response.ok) {
    throw new Error("Ошибка при загрузке данных");
  }
  return response.json();
};
