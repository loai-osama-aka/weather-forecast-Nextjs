export interface CurrentConditions {
  datetime: string;
  datetimeEpoch: number;

  temp: number;
  feelslike: number;

  humidity: number;
  dew: number;

  precip: number | null;
  precipprob: number;
  preciptype: string[] | null;

  snow: number;
  snowdepth: number;

  windgust: number | null;
  windspeed: number;
  winddir: number;

  pressure: number;
  visibility: number;
  cloudcover: number;

  solarradiation: number;
  solarenergy: number;
  uvindex: number;

  conditions: string;
  icon: string;

  stations: string[];
  source: string;

  sunrise: string;
  sunriseEpoch: number;
  sunset: string;
  sunsetEpoch: number;

  moonphase: number;
}