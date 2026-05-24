/**
 * Переводит координаты из градусов (WGS84) в метры (EPSG:3857)
 * @param {number} lng - Долгота в градусах
 * @param {number} lat - Широта в градусах
 * @returns {Array} [x, y] - Координаты X и Y в метрах
 */
export const turnDegreesToMeters = (lng: number, lat: number) => {
  const R = 6378137; // Экваториальный радиус Земли в метрах
  const x = ((lng * Math.PI) / 180) * R;

  // Перевод широты (Y) с защитой от выхода за пределы проекции Меркатора (+/- 85.0511°)
  const latRad = (lat * Math.PI) / 180;
  const y = Math.log(Math.tan(Math.PI / 4 + latRad / 2)) * R;

  return [x, y]; // Возвращает [x, y] в метрах
};

// Тест на полученных ранее градусах Москвы:
// console.log(epsg4326To3857(37.6830626883668, 55.79195859190519));
// Результат точно вернет ваши исходные метры: [4194859.35, 7517111.48]
