import { Select } from "@mantine/core";
import { useMcdMckMetroInput } from "./useMcdMckMetroInput";

export const McdMckMetroInput = ({
  type,
}: {
  type: "mck" | "mcd" | "metro";
}) => {
  const { handleSubmit, setName, setLine, setStatus, setX, setY } =
    useMcdMckMetroInput(type);

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
