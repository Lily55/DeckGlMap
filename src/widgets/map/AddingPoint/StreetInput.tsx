import { useState } from "react";
import { turnDegreesToMeters } from "./lib";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createStreetPoint } from "../../../shared/api/methods";

export const StreetInput = () => {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [x, setX] = useState("");
  const [y, setY] = useState("");
  const queryClient = useQueryClient();

  const streetMutation = useMutation({
    mutationFn: createStreetPoint,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["streets"] });
    },
    onError: (error) => {
      console.log(`Ошибка: ${error.message}`);
    },
  });

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const params = {
      type: "Feature",
      properties: {
        ST_NAME: name,
        ST_NM_CITY: city,
      },
      geometry: {
        type: "Point",
        coordinates: turnDegreesToMeters(Number(x), Number(y)),
      },
    };

    streetMutation.mutate(params);
  };

  return (
    <form onSubmit={handleSubmit}>
      <p>
        Название улицы: <input onChange={(e) => setName(e.target.value)} />
      </p>
      <p>
        Название города: <input onChange={(e) => setCity(e.target.value)} />
      </p>
      <p>
        Координата x: <input onChange={(e) => setX(e.target.value)} />
      </p>
      <p>
        Координата y: <input onChange={(e) => setY(e.target.value)} />
      </p>
      <input type="submit" value="Добавить улицу" />
    </form>
  );
};
