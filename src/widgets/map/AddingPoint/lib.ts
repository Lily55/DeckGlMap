/**
 * Переводит координаты из градусов (WGS84) в метры (EPSG:3857)
 * @param {number} lng - Долгота в градусах
 * @param {number} lat - Широта в градусах
 * @returns {Array} [x, y] - Координаты X и Y в метрах
 */
export const turnDegreesToMeters = (lng: number, lat: number) => {
  const R = 6378137; // Экваториальный радиус Земли в метрах
  const x = ((lng * Math.PI) / 180) * R;

  const latRad = (lat * Math.PI) / 180;
  const y = Math.log(Math.tan(Math.PI / 4 + latRad / 2)) * R;

  return [x, y];
};
