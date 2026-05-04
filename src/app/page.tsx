"use client";
import Container from "@/components/container";
import ForecastWeatherDetails from "@/components/ForecastWeatherDetails";
import Navbar from "@/components/Navbar";
import WeatherDetails from "@/components/WeatherDetails";
import WeatherIcon from "@/components/WeatherIcon";
import { WeatherResponse } from "@/interfaces/WeatherResponse";
import { convertFahrenheitToCelsius } from "@/utils/convertFahrenheitToCelsius";
import { FormatTime } from "@/utils/timeFormat";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { format, parseISO } from "date-fns";
import { useAtom } from "jotai";
import { atomplace, loadingAtomCity } from "./atom";
import { useEffect } from "react";
import { ForecastSkeleton, TodaySkeleton } from "@/components/Skeleton";

export default function Home() {
  const [place, setPlace] = useAtom(atomplace);
    const [loadingCity, setLoadingCity] = useAtom(loadingAtomCity);
  

  const { isLoading, error, data,refetch } = useQuery<WeatherResponse>({
    queryKey: ["repoData"],
    queryFn: async () => {
      const { data } = await axios.get(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${place}?key=${process.env.NEXT_PUBLIC_WEATHER_KEY}`,
      );
      return data;
    },
  });

  useEffect(() => {refetch()
  }, [place,refetch])
  console.log(data?.days, "dataaa");

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-full">
        <p className="animate-bounce">Loading...</p>
      </div>
    );
  const firstDay = data?.days[0].datetime;
  
    if(loadingCity){
      return (
      <main className="px-3 max-w-7xl mx-auto flex flex-col gap-9 w-full pb-10 pt-4">
        <TodaySkeleton />
        <ForecastSkeleton />
      </main>

      )
    }
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col gap-4">
      <Navbar location={data?.address ?? "Unknown Location"} />
      <main className="px-3 max-w-7xl mx-auto flex flex-col gap-9 w-full pb-10 pt-4">
        {/* ********************today data section******************** */}
        <section>
          <div>
            <div className="text-black mb-2 dark:text-white flex gap-1  items-end">
              <h2 className="text-2xl font-bold">
                {format(parseISO(firstDay ?? ""), "EEEE")}
              </h2>
              <p className="text-lg ">
                ({format(parseISO(firstDay ?? ""), "dd.MM.yyyy")})
              </p>
            </div>
            <Container className="text-center">
              {/* today temperature */}
              <div className="flex flex-col gap-1 px-4">
                <span className="text-5xl">
                  {convertFahrenheitToCelsius(data?.days[0].temp ?? 70.4)}°C
                </span>
                <p className="text-xs space-x-1 whitespace-nowrap">
                  <span>Feels like </span>
                  <span>
                    {convertFahrenheitToCelsius(
                      data?.days[0].feelslike ?? 70.4,
                    )}
                    °C
                  </span>
                </p>
                <p className="text-xs space-x-2">
                  <span>
                    {convertFahrenheitToCelsius(data?.days[0].tempmax ?? 70.4)}
                    °C
                  </span>
                  <span> / </span>
                  <span>
                    {convertFahrenheitToCelsius(data?.days[0].tempmin ?? 70.4)}
                    °C
                  </span>
                </p>
              </div>
              {/* time & weather icon */}
              <div className="flex gap-10 mx-2 sm:gap-16 overflow-x-auto w-full justify-between pr-3">
                {data?.days[0].hours.map((hour, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center gap-3 justify-between text-xs font-semibold"
                  >
                    <p className="whitespace-nowrap  ">
                      {format(
                        parseISO(`1970-01-01T${hour.datetime}`),
                        "h:mm a",
                      )}
                    </p>
                    <div>
                      <WeatherIcon icon={hour.icon} />
                    </div>
                    <p>{convertFahrenheitToCelsius(hour.temp)} °C</p>
                  </div>
                ))}
              </div>
            </Container>
          </div>
          <div className="flex mt-3 gap-4">
            {/* left */}
            <Container className="w-fit justify-center flex-col px-4 items-center">
              <p className="capitalize text-center ">
                {data?.days[0].description}
              </p>
              <WeatherIcon icon={data?.days[0].icon ?? "clear-day"} />
            </Container>
            {/* right */}
            <Container className="bg-yellow-300/80 px-6 gap-4 justify-between overflow-x-auto">
              <WeatherDetails
                visibility={data?.days[0].visibility}
                humidity={data?.days[0].humidity}
                pressure={data?.days[0].pressure}
                windSpeed={data?.days[0].windspeed}
                sunrise={FormatTime(data?.days[0].sunrise)}
                sunset={FormatTime(data?.days[0].sunset)}
              />
            </Container>
          </div>
        </section>
        {/* ********************7 days data section******************** */}
        <section className="flex text-black dark:text-white w-full flex-col gap-4">
          <p className="text-2xl">7-day forecast</p>
          {data?.days.map((day, i) => (
            <ForecastWeatherDetails
              key={i}
              weatherIcon={day.icon}
              date={format(parseISO(day.datetime), "dd.MM.yyyy")}
              day={format(parseISO(day.datetime), "EEEE")}
              temp={day.temp}
              feels_like={day.feelslike}
              temp_min={day.tempmin}
              temp_max={day.tempmax}
              description={day.description}
              visibility={day.visibility}
              humidity={day.humidity}
              pressure={day.pressure}
              windSpeed={day.windspeed}
              sunrise={FormatTime(day.sunrise)}
              sunset={FormatTime(day.sunset)}
            />
          ))}
        </section>
      </main>
    </div>
  );
}


