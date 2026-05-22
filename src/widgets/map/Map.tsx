import { DeckGL } from "@deck.gl/react";
import { ArcLayer, GeoJsonLayer } from "@deck.gl/layers";
import { MapViewState, OrthographicView } from "@deck.gl/core"; // 1. Импортируем OrthographicView
import { useQuery } from "@tanstack/react-query";
import { fetchMckStations, fetchStreets } from "../../shared/api/methods";
import { useState } from "react";

interface CartesianViewState
  extends Omit<MapViewState, "longitude" | "latitude"> {
  target: [number, number] | number[];
  zoom: number;
  bearing?: number;
  pitch?: number;
}

const INITIAL_VIEW_STATE: CartesianViewState = {
  target: [4197034.27, 7524490.97],
  zoom: 10,
  // Для декартовой плоскости pitch и bearing обычно сбрасывают в 0,
  // так как 3D-наклон на плоскости без меркаторской камеры может вести себя некорректно
  bearing: 0,
  pitch: 0,
};

export const Map = () => {
  const onClick = (info) => {
    if (info.object && info.object.properties) {
      alert(
        `${info.object.properties.name_station} (${info.object.properties.type})`
      );
    }
  };

  // Стейт для хранения данных о кликнутом объекте
  const [clickedInfo, setClickedInfo] = useState<{
    x: number;
    y: number;
    properties: any;
  } | null>(null);

  const {
    data: mckData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["mckStations"],
    queryFn: fetchMckStations,
  });

  const {
    data: streetsData,
    isLoading: streetsLading,
    isError: isStreetsError,
    error: streetsError,
  } = useQuery({
    queryKey: ["streets"],
    queryFn: fetchStreets,
  });

  if (isLoading || streetsLading)
    return <div style={{ padding: 20 }}>Загрузка карты и станций МЦК...</div>;
  if (isError || isStreetsError)
    return (
      <div style={{ padding: 20, color: "red" }}>Ошибка: {error.message}</div>
    );
  if (
    !mckData ||
    !mckData.features ||
    mckData.features.length === 0 ||
    !streetsData ||
    !streetsData.features ||
    streetsData.features.length === 0
  ) {
    return <div style={{ padding: 20 }}>Данные не найдены или пусты</div>;
  }

  // Предположим, что вы загрузили этот JSON через useQuery и записали в переменную `roadsData`

  const layers = [
    // 1. Слой улиц должен идти ПЕРВЫМ в массиве, чтобы точки станций рисовались ПОВЕРХ него
    new GeoJsonLayer({
      id: "roads-layer",
      data: streetsData, // Сюда передайте данные ваших улиц (useQuery или импорт)
      coordinateSystem: "cartesian",
      stroked: true,
      filled: false,

      // ГЛАВНОЕ ИСПРАВЛЕНИЕ: принудительно заставляем deck.gl считать ширину в пикселях экрана
      lineWidthUnits: "pixels",

      // Теперь это значение означает "3 пикселя", и дорога будет видна на любом зуме
      getLineWidth: (f: any) => f.properties.Width || 3,

      // Сделайте цвет контрастным (например, белый или ярко-серый), чтобы проверить видимость
      getLineColor: [255, 0, 0, 100],

      lineWidthMinPixels: 2,
      pickable: true,
      autoHighlight: true,
      onClick: (info) => {
        if (info.object) {
          setClickedInfo({
            x: info.x, // Экранная координата X клика
            y: info.y, // Экранная координата Y клика
            properties: info.object.properties, // Все свойства из JSON
          });
        } else {
          setClickedInfo(null); // Кликнули на пустое место — закрываем тултип
        }
      },
    }),

    new GeoJsonLayer({
      id: "mck-layer",
      data: mckData,
      coordinateSystem: "cartesian",
      filled: true,
      pointRadiusMinPixels: 6,
      getFillColor: [0, 128, 255],
      pickable: true,
      autoHighlight: true,
      onClick: onClick,
    }),
  ];

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      <DeckGL
        // 2. Явно приводим viewState, чтобы обойти жесткие типы компонента
        initialViewState={INITIAL_VIEW_STATE as any}
        controller={true}
        layers={layers}
        // 3. ГЛАВНОЕ ИСПРАВЛЕНИЕ: Переключаем камеру в режим работы с бесконечной плоскостью (метрами)
        views={new OrthographicView({ id: "ortho-view" })}
      />
      {clickedInfo && (
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
          }}
        >
          {/* Выводим любые нужные поля из свойств вашей улицы */}
          <div style={{ fontWeight: "bold", marginBottom: "6px" }}>
            {clickedInfo.properties.ST_NAME || "Название неизвестно"}
          </div>
          <div style={{ fontSize: "12px", color: "#666" }}>
            Тип: {clickedInfo.properties.ST_TYP_BEF} <br />
            Категория: {clickedInfo.properties.ROAD_CATEG} <br />
            Макс. скорость (обратно): {
              clickedInfo.properties.MaxSpdRvrs
            } км/ч <br />
            Ширина: {clickedInfo.properties.Width} м
          </div>

          {/* Кнопка закрытия внутри самого тултипа, если убрать pointerEvents: "none" */}
          <button
            style={{
              marginTop: "8px",
              cursor: "pointer",
              pointerEvents: "auto",
            }}
            onClick={(e) => {
              e.stopPropagation(); // Чтобы клик не улетел на карту
              setClickedInfo(null);
            }}
          >
            Закрыть
          </button>
        </div>
      )}
    </div>
  );
};
