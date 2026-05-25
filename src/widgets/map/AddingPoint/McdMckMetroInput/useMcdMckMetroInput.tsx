import { useState } from "react";
import { turnDegreesToMeters } from "../lib";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createMcdPoint,
  createMckPoint,
  createMetroPoint,
} from "../../../../shared/api/methods";

export const useMcdMckMetroInput = (type: "mcd" | "mck" | "metro") => {
  const [name, setName] = useState("");
  const [line, setLine] = useState("");
  const [status, setStatus] = useState<string | null>("");
  const [x, setX] = useState("");
  const [y, setY] = useState("");
  const queryClient = useQueryClient();

  const mckMutation = useMutation({
    mutationFn: createMckPoint,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mckStations"] });
    },
    onError: (error) => {
      console.log(`Ошибка: ${error.message}`);
    },
  });

  const mcdMutation = useMutation({
    mutationFn: createMcdPoint,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mcdStations"] });
    },
    onError: (error) => {
      console.log(`Ошибка: ${error.message}`);
    },
  });

  const metroMutation = useMutation({
    mutationFn: createMetroPoint,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["metro"] });
    },
    onError: (error) => {
      console.log(`Ошибка: ${error.message}`);
    },
  });

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (type === "mck") {
      const params = {
        type: "Feature",
        properties: {
          name_station: name,
          name_line: line,
          status,
          type: "МЦК",
          longitude: x,
          latitude: y,
        },
        geometry: {
          type: "Point",
          coordinates: turnDegreesToMeters(Number(x), Number(y)),
        },
      };

      mckMutation.mutate(params);
      return;
    }

    if (type === "mcd") {
      const params = {
        type: "Feature",
        properties: {
          name_station: name,
          name_line: line,
          status,
          type: "МЦД",
          longitude: x,
          latitude: y,
        },
        geometry: {
          type: "Point",
          coordinates: turnDegreesToMeters(Number(x), Number(y)),
        },
      };

      mcdMutation.mutate(params);
      return;
    }

    if (type === "metro") {
      const params = {
        type: "Feature",
        properties: {
          name_station: name,
          name_line: line,
          status,
          type: "М",
          longitude: x,
          latitude: y,
        },
        geometry: {
          type: "Point",
          coordinates: turnDegreesToMeters(Number(x), Number(y)),
        },
      };

      metroMutation.mutate(params);
      return;
    }
  };

  return {
    handleSubmit,
    setName,
    setLine,
    setStatus,
    setX,
    setY,
  };
};
