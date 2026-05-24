import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { createBusTramStopPoint } from "../../../shared/api/methods";
import { turnDegreesToMeters } from "./lib";

export const BusTramInput = () => {
  const [name, setName] = useState("");
  const [rayon, setRayon] = useState("");
  const [ao, setAO] = useState("");
  const [address, setAddress] = useState("");
  const [x, setX] = useState("");
  const [y, setY] = useState("");
  const queryClient = useQueryClient();

  const busTramStopMutation = useMutation({
    mutationFn: createBusTramStopPoint,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["busTramsStops"] });
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
        name_mpv: name,
        rayon,
        ao,
        address_mpv: address,
        y,
        x,
      },
      geometry: {
        type: "Point",
        coordinates: turnDegreesToMeters(Number(x), Number(y)),
      },
    };

    busTramStopMutation.mutate(params);
  };

  return (
    <form onSubmit={handleSubmit}>
      <p>
        Название остановки: <input onChange={(e) => setName(e.target.value)} />
      </p>
      <p>
        Название района: <input onChange={(e) => setRayon(e.target.value)} />
      </p>
      <p>
        Округ: <input onChange={(e) => setAO(e.target.value)} />
      </p>
      <p>
        Адрес: <input onChange={(e) => setAddress(e.target.value)} />
      </p>
      <p>
        Координата x: <input onChange={(e) => setX(e.target.value)} />
      </p>
      <p>
        Координата y: <input onChange={(e) => setY(e.target.value)} />
      </p>
      <input type="submit" value="Добавить остановку" />
    </form>
  );
};
