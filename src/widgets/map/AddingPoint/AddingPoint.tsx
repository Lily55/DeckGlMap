import { useState } from "react";
import { McdMckMetroInput } from "./McdMckMetroInput";
import { BusTramInput } from "./BusTramInput";
import { Select } from "@mantine/core";

const FormComponent = ({
  type,
}: {
  type: "mck" | "mcd" | "metro" | "street" | "busTramStop" | null;
}) => {
  switch (type) {
    case "mcd":
      return <McdMckMetroInput type={type} />;
    case "mck":
      return <McdMckMetroInput type={type} />;
    case "metro":
      return <McdMckMetroInput type={type} />;
    case "busTramStop":
      return <BusTramInput />;
    default:
      return null;
  }
};

export const AddingPoint = () => {
  // название, тип, координаты, описание
  const [type, setType] = useState<
    "mcd" | "mck" | "metro" | "street" | "busTramStop" | null
  >(null);

  return (
    <div style={{ position: "fixed" }}>
      <p>Выберите тип формы:</p>
      <Select
        data={["mcd", "mck", "metro", "street", "busTramStop"]}
        onChange={setType}
      />
      <FormComponent type={type} />
    </div>
  );
};
