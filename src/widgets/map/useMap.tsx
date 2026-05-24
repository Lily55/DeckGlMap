import { useQuery } from "@tanstack/react-query";
import {
  getBusTramStops,
  getMcdStations,
  getMckStations,
  getMetroStations,
  getStreets,
} from "../../shared/api/methods";
import { createBusTramsLayer } from "./Layers/BusTramsLayer";
import { createMcdLayer } from "./Layers/McdLayer";
import { createMckLayer } from "./Layers/MckLayer";
import { createMetroLayer } from "./Layers/MetroLayer";
import { createStreetsLayer } from "./Layers/StreetsLayer";
import { useState } from "react";

export const useMap = () => {
  const [addFormOpened, setAddFormOpened] = useState(false);

  const onPointClick = (info: { object?: any; x: number; y: number }) => {
    if (info.object) {
      setClickedInfo({
        x: info.x,
        y: info.y,
        properties: info.object.properties,
      });
    } else {
      setClickedInfo(null);
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
    queryFn: getMckStations,
  });

  const { data: streetsData } = useQuery({
    queryKey: ["streets"],
    queryFn: getStreets,
  });

  const { data: metroData } = useQuery({
    queryKey: ["metro"],
    queryFn: getMetroStations,
  });

  const { data: mcdData } = useQuery({
    queryKey: ["mcdStations"],
    queryFn: getMcdStations,
  });

  const { data: busTramsData } = useQuery({
    queryKey: ["busTramsStops"],
    queryFn: getBusTramStops,
  });

  const handleTooltipClose = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setClickedInfo(null);
  };

  const layers = [
    createStreetsLayer({ data: streetsData, onClick: onPointClick }),

    createMckLayer({ data: mckData, onClick: onPointClick }),

    createMetroLayer({ data: metroData, onClick: onPointClick }),

    createMcdLayer({ data: mcdData, onClick: onPointClick }),

    createBusTramsLayer({ data: busTramsData, onClick: onPointClick }),
  ].filter(Boolean);

  return {
    layers,
    clickedInfo,
    addFormOpened,
    setAddFormOpened,
    handleTooltipClose,
  };
};
