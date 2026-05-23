import {
  McdStationFeatureCollection,
  MckStationFeatureCollection,
  MetroStationFeatureCollection,
  RoadSegmentFeatureCollection,
  TramStopFeatureCollection,
} from "../../entities/geoObject/types";

export const fetchMckStations =
  async (): Promise<MckStationFeatureCollection> => {
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

export const fetchMcdStations =
  async (): Promise<McdStationFeatureCollection> => {
    const response = await fetch("mcdStation.json");
    if (!response.ok) {
      throw new Error("Ошибка при загрузке данных");
    }
    return response.json();
  };

export const fetchMetroStations =
  async (): Promise<MetroStationFeatureCollection> => {
    const response = await fetch("metroStation.json");
    if (!response.ok) {
      throw new Error("Ошибка при загрузке данных");
    }
    return response.json();
  };

export const fetchBusTramStops =
  async (): Promise<TramStopFeatureCollection> => {
    const response = await fetch("busTramStops.json");
    if (!response.ok) {
      throw new Error("Ошибка при загрузке данных");
    }
    return response.json();
  };

export const createPoint = async (newPointData) => {
  const response = await fetch("/api/points", {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Обязательно сообщаем серверу, что шлем JSON
    },
    body: JSON.stringify(newPointData), // Превращаем JS-объект в строку
  });

  if (!response.ok) {
    throw new Error("Не удалось сохранить точку на сервере");
  }

  return response.json(); // Возвращает ответ сервера: { message: '...', point: ... }
};
