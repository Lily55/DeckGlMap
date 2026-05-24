import { useState } from "react";
import { McdMckMetroInput } from "./McdMckMetroInput/McdMckMetroInput";
import { BusTramInput } from "./BusTramInput";
import { Select } from "@mantine/core";
import { StreetInput } from "./StreetInput";

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
    case "street":
      return <StreetInput />;
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
    <div
      style={{
        position: "fixed",
        top: "31px",
        backgroundColor: "white",
        color: "black",
        padding: "12px",
        borderRadius: "8px",
        boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
        fontFamily: "sans-serif",
        fontSize: "14px",
      }}
    >
      <p>Выберите тип формы:</p>
      <Select
        data={["mcd", "mck", "metro", "street", "busTramStop"]}
        onChange={setType}
      />
      <FormComponent type={type} />
    </div>
  );
};
