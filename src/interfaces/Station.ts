export interface Station {
  distance: number;
  latitude: number;
  longitude: number;

  useCount: number;
  id: string;
  name: string;

  quality: number;
  contribution: number;
}