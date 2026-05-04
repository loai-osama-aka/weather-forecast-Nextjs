/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import React, { useEffect, useState } from "react";
import { FaMoon } from "react-icons/fa6";
import { MdMyLocation, MdOutlineLocationOn, MdWbSunny } from "react-icons/md";
import SearchBox from "./SearchBox";
import axios from "axios";
import { useAtom } from "jotai";
import { atomplace, loadingAtomCity } from "@/app/atom";

type Props={
  location:string
}
export default function Navbar({ location }: Props  ) {
  const [darkMode, setDarkMode] = useState(false);
  const [city, setCity] = useState("");
  const [error, setError] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [place, setPlace] = useAtom(atomplace);
  const [_, setLoadingCity] = useAtom(loadingAtomCity);
  async function handleInputChange(value: string) {
    setCity(value);
    if (value.length >= 3) {
      try {
        const response = await axios.get(
          `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${value}?key=${process.env.NEXT_PUBLIC_WEATHER_KEY}`,
        );
        const suggestions = response.data.address;
        setSuggestions([suggestions]);
        setError("");
        setShowSuggestions(true);
    

        console.log(suggestions, "suggestions");
      } catch (error) {
        setSuggestions([]);
        setShowSuggestions(false);
        setError("Failed to fetch weather data");
      }
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }

  function handleSuggestionClick(suggestion: string) {
    setCity(suggestion);
    setShowSuggestions(false);
  }
  function handleSubmit(e: React.SubmitEvent<HTMLButtonElement>) {
    setLoadingCity(true);
    e.preventDefault();
    if (suggestions.length == 0) {
      setLoadingCity(false);
      setError("Location not found");
    } else {
      setError("");
      setTimeout(() => {
        setPlace(city);
        setLoadingCity(false);
      }, 500);
    }
  }
  //load theme from local storage
  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    }
  }, []);
  //toggle theme
  function toggleTheme() {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setDarkMode(true);
    }
  }
  function handleCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          setLoadingCity(true);
          const response = await axios.get(
            `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${latitude},${longitude}?key=${process.env.NEXT_PUBLIC_WEATHER_KEY}`,
          );
          const locationName = response.data.timezone;
          
          
          setLoadingCity(false);
          setPlace(locationName);
          setError("");
        } catch (error) {
          setLoadingCity(false);
          setError("Failed to fetch weather data for current location");
        }
      });
    }
  }
  return (
    <nav className="shadow-sm sticky top-0 left-0 z-50 bg-white dark:bg-black">
      <div className="min-h-20 w-full flex flex-col md:flex-row md:justify-between md:items-center gap-3 max-w-7xl px-3 mx-auto py-2">
        {/* Logo + Theme */}
        <div className="flex justify-between items-center gap-2 w-full md:w-auto">
          <h2 className="text-gray-500 dark:text-white text-2xl md:text-3xl">
            Weather App
          </h2>

          <button
            className="p-2  mt-1 rounded-full cursor-pointer bg-gray-200 dark:bg-gray-700"
            onClick={toggleTheme}
          >
            {darkMode ? <MdWbSunny className="text-yellow-500" /> : <FaMoon />}
          </button>
        </div>

        {/* Right Section */}
        <section className="flex flex-col md:flex-row md:items-center gap-3 w-full md:w-auto">
          {/* Location */}
          <div className="flex items-center gap-2">
            <MdMyLocation 
            title="your current location"
            onClick={handleCurrentLocation}
            className="text-2xl text-gray-400 hover:text-blue-500 dark:text-white dark:hover:text-blue-500 cursor-pointer" />
            <MdOutlineLocationOn className="text-2xl text-gray-400 dark:text-white" />
            <p className="text-slate-900/80 text-sm dark:text-slate-50">
              {location}
            </p>
          </div>

          {/* Search */}
          <div className="relative w-full md:w-auto">
            <SearchBox
              value={city}
              onChange={(e) => handleInputChange(e.target.value)}
              onSubmit={handleSubmit}
              className="w-full md:w-64"
            />
            {
              <SuggestionBox
                error={error}
                handleSuggestionClick={handleSuggestionClick}
                showSuggestions={showSuggestions}
                suggestions={suggestions}
              />
            }
          </div>
        </section>
      </div>
    </nav>
  );
}
function SuggestionBox({
  showSuggestions,
  suggestions,
  handleSuggestionClick,
  error,
}: {
  showSuggestions: boolean;
  suggestions: string[];
  handleSuggestionClick: (suggestion: string) => void;
  error: string;
}) {
  return (
    <>
      {(showSuggestions && suggestions.length > 0) || error ? (
  <ul className="mb-4 bg-white absolute border top-11 left-0 border-gray-300 rounded-md min-w-50 flex flex-col gap-1 p-2">
    {error && suggestions.length === 0 && (
      <li className="text-red-500 p-1 rounded">{error}</li>
    )}

    {suggestions.map((suggestion, index) => (
      <li
        key={index}
        onClick={() => handleSuggestionClick(suggestion)}
        className="cursor-pointer p-1 rounded hover:bg-gray-200"
      >
        {suggestion}
      </li>
    ))}
  </ul>
) : null}
    </>
  );
}
