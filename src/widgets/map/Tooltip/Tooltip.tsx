import { useEffect, useRef } from "react";

type Props = {
  onClick: (e) => void;
  clickedInfo: {
    x: number;
    y: number;
    properties: Record<string, string | number | null>;
  };
};

export const Tooltip = ({ onClick, clickedInfo }: Props) => {
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Как только тултип примонтировался, переводим на него фокус
    if (tooltipRef.current) {
      tooltipRef.current.focus();
    }
  }, [clickedInfo]);

  return (
    <div ref={tooltipRef}>
      <div
        style={{
          position: "absolute",
          zIndex: 10, // Чтобы был строго поверх холста deck.gl
          left: clickedInfo.x + 15, // Немного смещаем вправо от курсора
          top: clickedInfo.y + 15, // Немного смещаем вниз от курсора
          backgroundColor: "white",
          color: "black",
          padding: "12px",
          borderRadius: "8px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
          fontFamily: "sans-serif",
          fontSize: "14px",
          pointerEvents: "none", // Чтобы тултип не мешал дальнейшим кликам по карте
          maxWidth: "300px",
          maxHeight: "300px",
          overflow: "auto",
        }}
      >
        {Object.values(clickedInfo.properties).map((item) => (
          <p>{item}</p>
        ))}
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
