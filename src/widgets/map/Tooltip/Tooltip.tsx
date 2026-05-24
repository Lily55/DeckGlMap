import { useEffect, useRef } from "react";
import { Properties } from "../../../shared/api/types";
import { TYPE } from "./lib";

type Props = {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  clickedInfo: {
    x: number;
    y: number;
    properties: Properties;
  };
};

export const Tooltip = ({ onClick, clickedInfo }: Props) => {
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (tooltipRef.current) {
      tooltipRef.current.focus();
    }
  }, [clickedInfo]);

  return (
    <div
      style={{
        position: "absolute",
        zIndex: 10,
        maxHeight: "300px",
        overflow: "auto",
        left: clickedInfo.x + 15,
        top: clickedInfo.y + 15,
        backgroundColor: "white",
        color: "black",
        padding: "12px",
        borderRadius: "8px",
        boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
        fontFamily: "sans-serif",
        fontSize: "14px",
        maxWidth: "300px",
      }}
      ref={tooltipRef}
    >
      <div>
        <p>Тип: {TYPE[clickedInfo.properties.type]}</p>
        <p>Название: {clickedInfo.properties.name}</p>
        <p>Описание: {clickedInfo.properties.description}</p>
        {clickedInfo.properties.x ? (
          <p>Широта: {clickedInfo.properties.x}</p>
        ) : null}
        {clickedInfo.properties.y ? (
          <p>Долгота: {clickedInfo.properties.y}</p>
        ) : null}
      </div>
      <button
        style={{
          marginTop: "8px",
          cursor: "pointer",
          pointerEvents: "auto",
        }}
        onClick={onClick}
      >
        Закрыть
      </button>
    </div>
  );
};
