import { Select } from "@mantine/core";
import { SubmitEventHandler, useState } from "react";
import { turnDegreesToMeters } from "./lib";
import { createMckPoint } from "../../../shared/api/methods";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const McdMckMetroInput = ({
  type,
}: {
  type: "mck" | "mcd" | "metro";
}) => {
  const [name, setName] = useState("");
  const [line, setLine] = useState("");
  const [status, setStatus] = useState<string | null>("");
  const [x, setX] = useState("");
  const [y, setY] = useState("");
  const queryClient = useQueryClient();

  // Настройка мутации TanStack Query
  const mutation = useMutation({
    mutationFn: createMckPoint,
    onSuccess: () => {
      // 1. При успешной записи в JSON сбрасываем кеш карты
      // Это заставит Deck.gl автоматически перезапросить GET /api/points и отобразить маркер
      queryClient.invalidateQueries({ queryKey: ["mckStations"] });

      // 2. Очищаем поля формы
      // setFormData({ name: "", type: "", lat: "", lng: "", desc: "" });
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

      mutation.mutate(params);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <p>
        Название станции: <input onChange={(e) => setName(e.target.value)} />
      </p>
      <p>
        Название линии: <input onChange={(e) => setLine(e.target.value)} />
      </p>
      <p>
        Статус:{" "}
        <Select
          data={["Действующая", "Планируемая", "Закрытая"]}
          onChange={setStatus}
        />
      </p>
      <p>
        Координата x: <input onChange={(e) => setX(e.target.value)} />
      </p>
      <p>
        Координата y: <input onChange={(e) => setY(e.target.value)} />
      </p>
      <input type="submit" value="Добавить станцию" />
    </form>
  );
};
