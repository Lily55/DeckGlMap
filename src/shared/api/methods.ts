import {
  busTramStopsTransformer,
  mcdTransformer,
  mckTransformer,
  metroTransformer,
  streetsTransformer,
} from "./transformers";
import {
  McdStationFeatureCollection,
  MckStationFeatureCollection,
  MetroStationFeatureCollection,
  RoadSegmentFeatureCollection,
  TramStopFeatureCollection,
} from "./types";

export const getMckStations =
  async (): Promise<MckStationFeatureCollection> => {
    const response = await fetch("mckStation.json");
    if (!response.ok) {
      throw new Error("Ошибка при загрузке данных");
    }
    return mckTransformer(await response.json());
  };

export const getStreets = async (): Promise<RoadSegmentFeatureCollection> => {
  const response = await fetch("StreetsPedestrian.json");
  if (!response.ok) {
    throw new Error("Ошибка при загрузке данных");
  }
  return streetsTransformer(await response.json());
};

export const getMcdStations =
  async (): Promise<McdStationFeatureCollection> => {
    const response = await fetch("mcdStation.json");
    if (!response.ok) {
      throw new Error("Ошибка при загрузке данных");
    }
    return mcdTransformer(await response.json());
  };

export const getMetroStations =
  async (): Promise<MetroStationFeatureCollection> => {
    const response = await fetch("metroStation.json");
    if (!response.ok) {
      throw new Error("Ошибка при загрузке данных");
    }
    return metroTransformer(await response.json());
  };

export const getBusTramStops = async (): Promise<TramStopFeatureCollection> => {
  const response = await fetch("busTramStops.json");
  if (!response.ok) {
    throw new Error("Ошибка при загрузке данных");
  }
  return busTramStopsTransformer(await response.json());
};

// Сохранение можно сделать и через localStorage, но лучше сохранять точки в БД
export const createMckPoint = async (newPointData: {
  type: string;
  properties: {
    name_station: string;
    name_line: string;
    status: string | null;
    type: string;
    longitude: string;
    latitude: string;
  };
  geometry: {
    type: string;
    coordinates: number[];
  };
}) => {
  const response = await fetch("/api/addMckPoint", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newPointData),
  });

  if (!response.ok) {
    throw new Error("Не удалось сохранить точку на сервере");
  }

  return response.json();
};

export const createMcdPoint = async (newPointData: {
  type: string;
  properties: {
    name_station: string;
    name_line: string;
    status: string | null;
    type: string;
    longitude: string;
    latitude: string;
  };
  geometry: {
    type: string;
    coordinates: number[];
  };
}) => {
  const response = await fetch("/api/addMcdPoint", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newPointData),
  });

  if (!response.ok) {
    throw new Error("Не удалось сохранить точку на сервере");
  }

  return response.json();
};

export const createMetroPoint = async (newPointData: {
  type: string;
  properties: {
    name_station: string;
    name_line: string;
    status: string | null;
    type: string;
    longitude: string;
    latitude: string;
  };
  geometry: {
    type: string;
    coordinates: number[];
  };
}) => {
  const response = await fetch("/api/addMetroPoint", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newPointData),
  });

  if (!response.ok) {
    throw new Error("Не удалось сохранить точку на сервере");
  }

  return response.json();
};

export const createBusTramStopPoint = async (newPointData: {
  type: string;
  properties: {
    name_mpv: string;
    rayon: string;
    ao: string;
    address_mpv: string;
    y: string;
    x: string;
  };
  geometry: {
    type: string;
    coordinates: number[];
  };
}) => {
  const response = await fetch("/api/addBusTramStopPoint", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newPointData),
  });

  if (!response.ok) {
    throw new Error("Не удалось сохранить точку на сервере");
  }

  return response.json();
};

export const createStreetPoint = async (newPointData: {
  type: string;
  properties: {
    ST_NAME: string;
    ST_NM_CITY: string;
  };
  geometry: {
    type: string;
    coordinates: number[];
  };
}) => {
  const response = await fetch("/api/addStreetPoint", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newPointData),
  });

  if (!response.ok) {
    throw new Error("Не удалось сохранить точку на сервере");
  }

  return response.json();
};
