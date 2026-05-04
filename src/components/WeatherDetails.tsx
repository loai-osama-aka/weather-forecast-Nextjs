import React from "react";
import { FiDroplet } from "react-icons/fi";
import { ImMeter } from "react-icons/im";
import { LuEye, LuSunrise, LuSunset } from "react-icons/lu";
import { MdAir } from "react-icons/md";
export interface WeatherDetailsProps {
  visibility: number | undefined;
  humidity: number | undefined;
  pressure: number | undefined;
  windSpeed: number | undefined;
  sunrise: string | undefined;
  sunset: string | undefined;
}

export default function WeatherDetails({
  visibility,
  humidity,
  pressure,
  windSpeed,
  sunrise,
  sunset,
}: WeatherDetailsProps) {
  return (
    <>
      <SingleWeatherDetail
        icon={<LuEye />}
        information="Visibility"
        value={visibility + " km"}
      />
      <SingleWeatherDetail
        icon={<FiDroplet />}
        information="Humidity"
        value={humidity + " %"}
      />
      <SingleWeatherDetail
        icon={<ImMeter />}
        information="Pressure"
        value={pressure + " hPa"}
      />
      <SingleWeatherDetail
        icon={<MdAir />}
        information="Wind Speed"
        value={windSpeed + " km/h"}
      />
      <SingleWeatherDetail
        icon={<LuSunrise />}
        information="Sunrise"
        value={sunrise}
      />
      <SingleWeatherDetail
        icon={<LuSunset />}
        information="Sunset"
        value={sunset}
      />
    </>
  );
}

export interface SingleWeatherDetailProps {
  information: string;
  icon: React.ReactNode;
  value: string|number | undefined;
}
function SingleWeatherDetail({
  information,
  icon,
  value,
}: SingleWeatherDetailProps) {
  return (
    <div className="flex flex-col justify-between  items-center gap-2 text-xs font-semibold text-black/80  ">
      <p className="whitespace-nowrap">{information}</p>
      <div className="text-3xl">{icon}</div>
      <p className="whitespace-nowrap">{value}</p>
    </div>
  );
}
