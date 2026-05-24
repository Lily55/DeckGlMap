export interface Properties {
  type: "street" | "metro" | "mcd" | "mck" | "busTramStop";
  name: string;
  description: string;
  x?: number;
  y?: number;
}

export interface TramStopPropertiesDTO {
  name_mpv: string;
  rayon: string;
  ao: string;
  address_mpv: string;
  y: string;
  x: string;
  marshrut: string;
  in_date: number;
  off_date: number;
  icon: string;
  iconWidth: number;
  iconHeight: number;
  ExtrLdD1: number;
  ExtrLdA1: number;
  ExtrLdD2: string;
  ExtrLdA2: string;
  ExtrLdD3: string;
  ExtrLdA3: string;
  CurLd: string;
  CurLdRel: string;
  ExtrLdTot: number;
  NewLdRel: string;
  NewLd: string;
  ExtrLdRel: string;
  CurLdSt: string;
  CurLdRelSt: string;
  ExtrLdSt: string;
  ExtrLdRelSt: string;
  NewLdSt: string;
  NewLdRelSt: string;
  DistOnFoot: string;
  TimeOnFoot: string;
  AvgCurLdRp: string;
  AvgCurLdBT: string;
  AvgNewLdRp: string;
  AvgNewLdBT: string;
  PaintPoint: boolean;
  AvlbOnFoot: boolean;
}

export interface TramStopFeatureDTO {
  type: "Feature";
  properties: TramStopPropertiesDTO;
  geometry: {
    type: "Point";
    coordinates: [number, number]; // [Долгота, Широта] в метрах/градусах
  };
}

export interface TramStopFeature extends Omit<
  TramStopFeatureDTO,
  "properties"
> {
  properties: Properties;
}

// Пример типизации коллекции (FeatureCollection)
export interface TramStopFeatureCollectionDTO {
  type: "FeatureCollection";
  features: TramStopFeatureDTO[];
}

export interface TramStopFeatureCollection extends Omit<
  TramStopFeatureCollectionDTO,
  "features"
> {
  features: TramStopFeature[];
}

export interface McdStationProperties {
  id_uarms: number;
  name_station: string;
  name_line: string;
  type: string;
  status: string;
  longitude: number;
  latitude: number;
  level: string;
  area: string;
  administrative_district: string;
  area_full: string;
  administrative_district_full: string;
  code: number;
  no_line: string;
  transfer: string;
  name_station_name_line: string;
  id_line: number;
  id_station: number;
  icon: string;
  iconWidth: number;
  iconHeight: number;
  pass: number;
  ExtrLdD1: number;
  ExtrLdA1: number;
  ExtrLdD2: string;
  ExtrLdA2: string;
  ExtrLdD3: string;
  ExtrLdA3: string;
  CurLd: string;
  CurLdRel: string;
  ExtrLdTot: number;
  NewLdRel: string;
  NewLd: string;
  ExtrLdRel: string;
  CurLdSt: string;
  CurLdRelSt: string;
  ExtrLdSt: string;
  ExtrLdRelSt: string;
  NewLdSt: string;
  NewLdRelSt: string;
  DistOnFoot: string;
  TimeOnFoot: string;
  AvgCurLdRp: string;
  AvgCurLdBT: string;
  AvgNewLdRp: string;
  AvgNewLdBT: string;
  PaintPoint: boolean;
  AvlbOnFoot: boolean;
}

export interface McdStationFeatureDTO {
  type: "Feature";
  properties: McdStationProperties;
  geometry: {
    type: "Point";
    coordinates: [number, number];
  };
}

export interface McdStationFeature extends Omit<
  McdStationFeatureDTO,
  "properties"
> {
  properties: Properties;
}

export interface McdStationFeatureCollectionDTO {
  type: "FeatureCollection";
  features: McdStationFeatureDTO[];
}

export interface McdStationFeatureCollection extends Omit<
  McdStationFeatureCollectionDTO,
  "features"
> {
  features: McdStationFeature[];
}

export interface MckStationProperties {
  id_uarms: number;
  name_station: string;
  name_line: string;
  no_line: string;
  type: string;
  status: string;
  longitude: number;
  latitude: number;
  transfer: string;
  level: string;
  area: string;
  administrative_district: string;
  area_full: string;
  administrative_district_full: string;
  code: number;
  pass: number;
  icon: string;
  iconWidth: number;
  iconHeight: number;
  bandwidth_input: number;
  bandwidth_input_north: number | null;
  bandwidth_input_south: number | null;
  bandwidth_input_west: number | null;
  bandwidth_input_east: number | null;
  bandwidth_input_first: number | null;
  bandwidth_input_second: number | null;
  bandwidth_input_ground: number | null;
  bandwidth_input_underground: number | null;
  bandwidth_output: number;
  bandwidth_output_north: number | null;
  bandwidth_output_south: number | null;
  bandwidth_output_west: number | null;
  bandwidth_output_east: number | null;
  bandwidth_output_first: number | null;
  bandwidth_output_second: number | null;
  bandwidth_output_ground: number | null;
  bandwidth_output_underground: number | null;
  ExtrLdD1: number;
  ExtrLdA1: number;
  ExtrLdD2: string;
  ExtrLdA2: string;
  ExtrLdD3: string;
  ExtrLdA3: string;
  CurLd: string;
  CurLdRel: string;
  ExtrLdTot: number;
  NewLdRel: string;
  NewLd: string;
  ExtrLdRel: string;
  CurLdSt: string;
  CurLdRelSt: string;
  ExtrLdSt: string;
  ExtrLdRelSt: string;
  NewLdSt: string;
  NewLdRelSt: string;
  DistOnFoot: string;
  TimeOnFoot: string;
  AvgCurLdRp: string;
  AvgCurLdBT: string;
  AvgNewLdRp: string;
  AvgNewLdBT: string;
  PaintPoint: boolean;
  AvlbOnFoot: boolean;
}

export interface MckStationFeatureDTO {
  type: "Feature";
  properties: MckStationProperties;
  geometry: {
    type: "Point";
    coordinates: [number, number];
  };
}

export interface MckStationFeature extends Omit<
  MckStationFeatureDTO,
  "properties"
> {
  properties: Properties;
}

export interface MckStationFeatureCollectionDTO {
  type: "FeatureCollection";
  features: MckStationFeatureDTO[];
}

export interface MckStationFeatureCollection extends Omit<
  MckStationFeatureCollectionDTO,
  "features"
> {
  features: MckStationFeature[];
}

// Метро
export interface MetroStationProperties {
  id_uarms: number;
  name_station: string;
  name_line: string;
  no_line: string;
  type: string;
  status: string;
  longitude: number;
  latitude: number;
  level: string;
  area: string;
  administrative_district: string;
  area_full: string;
  administrative_district_full: string;
  code: number;
  transfer: string;
  date: string;
  icon: string;
  iconWidth: number;
  iconHeight: number;
  pass: number;
  bandwidth_input: number;
  bandwidth_input_north: number | null;
  bandwidth_input_south: number | null;
  bandwidth_input_west: number | null;
  bandwidth_input_east: number | null;
  bandwidth_input_first: number | null;
  bandwidth_input_second: number | null;
  bandwidth_input_ground: number | null;
  bandwidth_input_underground: number | null;
  bandwidth_output: number;
  bandwidth_output_north: number | null;
  bandwidth_output_south: number | null;
  bandwidth_output_west: number | null;
  bandwidth_output_east: number | null;
  bandwidth_output_first: number | null;
  bandwidth_output_second: number | null;
  bandwidth_output_ground: number | null;
  bandwidth_output_underground: number | null;
  ExtrLdD1: number;
  ExtrLdA1: number;
  ExtrLdD2: string;
  ExtrLdA2: string;
  ExtrLdD3: string;
  ExtrLdA3: string;
  CurLd: string;
  CurLdRel: string;
  ExtrLdTot: number;
  NewLdRel: string;
  NewLd: string;
  ExtrLdRel: string;
  CurLdSt: string;
  CurLdRelSt: string;
  ExtrLdSt: string;
  ExtrLdRelSt: string;
  NewLdSt: string;
  NewLdRelSt: string;
  DistOnFoot: string;
  TimeOnFoot: string;
  AvgCurLdRp: string;
  AvgCurLdBT: string;
  AvgNewLdRp: string;
  AvgNewLdBT: string;
  PaintPoint: boolean;
  AvlbOnFoot: boolean;
}

export interface MetroStationFeatureDTO {
  type: "Feature";
  properties: MetroStationProperties;
  geometry: {
    type: "Point";
    coordinates: [number, number];
  };
}

export interface MetroStationFeature extends Omit<
  MetroStationFeatureDTO,
  "properties"
> {
  properties: Properties;
}

export interface MetroStationFeatureCollectionDTO {
  type: "FeatureCollection";
  features: MetroStationFeatureDTO[];
}

export interface MetroStationFeatureCollection extends Omit<
  MetroStationFeatureCollectionDTO,
  "features"
> {
  features: MetroStationFeature[];
}

// Дороги
export interface RoadSegmentPropertiesDTO {
  EdgeId: number;
  ST_NAME: string;
  ST_TYP_BEF: string;
  ST_NM_BASE: string;
  ST_NM_CITY: string;
  FUNC_CLASS: number;
  ROAD_CATEG: string;
  F_ZLEV: number;
  T_ZLEV: number;
  TYPE_LINK: string;
  RoadDirect: string;
  RbndStght: number | null;
  RbndBck: number | null;
  Width: number;
  IsFerry: string;
  Style: number;
  U_TURN: number;
  OriginId: string;
  MaxSpdDrct: number;
  AvgSpdDrct: number;
  MaxSpdRvrs: number;
  AvgSpdRvrs: number;
  Foot: number;
  Car: number;
}

export interface RoadSegmentFeatureDTO {
  type: "Feature";
  properties: RoadSegmentPropertiesDTO;
  geometry: {
    type: "MultiLineString";
    coordinates: [number, number][][];
  };
}

export interface RoadSegmentFeature extends Omit<
  RoadSegmentFeatureDTO,
  "properties"
> {
  properties: Properties;
}

export interface RoadSegmentFeatureCollectionDTO {
  type: "FeatureCollection";
  name: string;
  crs: { type: string; properties: { name: string } };
  features: RoadSegmentFeatureDTO[];
}

export interface RoadSegmentFeatureCollection extends Omit<
  RoadSegmentFeatureCollectionDTO,
  "features"
> {
  features: RoadSegmentFeature[];
}
