import React from "react";
import Container from "./container";
import WeatherIcon from "./WeatherIcon";
import WeatherDetails, { WeatherDetailsProps } from "./WeatherDetails";
import { convertFahrenheitToCelsius } from "@/utils/convertFahrenheitToCelsius";

export interface ForecastWeatherDetailsProps extends WeatherDetailsProps {
  weatherIcon: string;
  date: string;
  day: string;
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  description: string;
}
export default function ForecastWeatherDetails(
  props: ForecastWeatherDetailsProps,
) {
  return (
    <Container className="gap-4 text-black">
      {/* left section */}
      <section className="flex gap-4 items-center px-4">
        <div>
          <WeatherIcon icon={props.weatherIcon} />
          <p>{props.date}</p>
          <p className="text-sm">{props.day}</p>
        </div>
        {/*  */}
        <div className="flex flex-col px-4">
          <span className="text-2xl">
            {convertFahrenheitToCelsius(props.temp)}°C
          </span>
          <p className="text-xs space-x-1 whitespace-nowrap">
            <span>Feels like </span>
            <span>{convertFahrenheitToCelsius(props.feels_like)}°C</span>
          </p>
          <p className="text-xs text-muted-foreground">{props.description}</p>
        </div>
      </section>
      {/* right section */}
      <section className="overflow-x-auto flex justify-between gap-4 px-4 w-full pr-10">
        <WeatherDetails {...props} />
      </section>
    </Container>
  );
}
