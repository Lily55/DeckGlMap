import { DeckGL } from "@deck.gl/react";
import { MapViewState, OrthographicView } from "@deck.gl/core"; // 1. Импортируем OrthographicView
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchBusTramStops,
  fetchMcdStations,
  fetchMckStations,
  fetchMetroStations,
  fetchStreets,
} from "../../shared/api/methods";
import { useState } from "react";
import { createMckLayer } from "./Layers/MckLayer";
import { createStreetsLayer } from "./Layers/StreetsLayer";
import { Tooltip } from "./Tooltip/Tooltip";
import { createMetroLayer } from "./Layers/MetroLayer";
import { createMcdLayer } from "./Layers/McdLayer";
import { createBusTramsLayer } from "./Layers/BusTramsLayer";
import { AddingPoint } from "./AddingPoint/AddingPoint";

interface CartesianViewState extends Omit<
  MapViewState,
  "longitude" | "latitude"
> {
  target: [number, number] | number[];
  zoom: number;
  bearing?: number;
  pitch?: number;
}

const INITIAL_VIEW_STATE: CartesianViewState = {
  target: [4197034.27, 7524490.97],
  zoom: 10,
  bearing: 0,
  pitch: 0,
};

export const Map = () => {
  const [addFormOpened, setAddFormOpened] = useState(false);

  const queryClient = useQueryClient();

  const onPointClick = (info: { object?: any; x: number; y: number }) => {
    if (info.object) {
      setClickedInfo({
        x: info.x, // Экранная координата X клика
        y: info.y, // Экранная координата Y клика
        properties: info.object.properties, // Все свойства из JSON
      });
    } else {
      setClickedInfo(null); // Кликнули на пустое место — закрываем тултип
    }
  };

  // Стейт для хранения данных о кликнутом объекте
  const [clickedInfo, setClickedInfo] = useState<{
    x: number;
    y: number;
    properties: any;
  } | null>(null);

  const { data: mckData } = useQuery({
    queryKey: ["mckStations"],
    queryFn: fetchMckStations,
  });

  const { data: streetsData } = useQuery({
    queryKey: ["streets"],
    queryFn: fetchStreets,
  });

  const { data: metroData } = useQuery({
    queryKey: ["metro"],
    queryFn: fetchMetroStations,
  });

  const { data: mcdData } = useQuery({
    queryKey: ["mcdStations"],
    queryFn: fetchMcdStations,
  });

  const { data: busTramsData } = useQuery({
    queryKey: ["busTramsStops"],
    queryFn: fetchBusTramStops,
  });

  const handleTooltipClose = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // Чтобы клик не улетел на карту
    setClickedInfo(null);
  };

  const layers = [
    createStreetsLayer({ data: streetsData, onClick: onPointClick }),

    createMckLayer({ data: mckData, onClick: onPointClick }),

    createMetroLayer({ data: metroData, onClick: onPointClick }),

    createMcdLayer({ data: mcdData, onClick: onPointClick }),

    createBusTramsLayer({ data: busTramsData, onClick: onPointClick }),
  ].filter(Boolean);

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      <DeckGL
        initialViewState={INITIAL_VIEW_STATE as any}
        controller={true}
        layers={layers}
        views={new OrthographicView({ id: "ortho-view" })}
      />

      {clickedInfo && (
        <Tooltip onClick={handleTooltipClose} clickedInfo={clickedInfo} />
      )}
      <button
        onClick={() => setAddFormOpened((prev) => !prev)}
        style={{ position: "fixed" }}
      >
        Отправить
      </button>
      {addFormOpened && <AddingPoint />}
    </div>
  );
};
