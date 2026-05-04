/* eslint-disable @typescript-eslint/no-explicit-any */
import { CurrentConditions } from "./CurrentConditions";
import { Day } from "./Day";
import { Station } from "./Station";

export interface WeatherResponse {
  queryCost: number;
  latitude: number;
  longitude: number;
  resolvedAddress: string;
  address: string;
  timezone: string;
  tzoffset: number;
  description: string;

  days: Day[];

  alerts: any[];

  stations: Record<string, Station>;

  currentConditions: CurrentConditions;
}