import React, { useState, useEffect } from "react";
import "../weather/weatherStyles.css";

const WeatherSearch = () => {
  const [weather, setWeather] = useState({});
  const [query, setQuery] = useState("");

  const fetchWeatherInfo = (evt) => {
    if (evt.key === "Enter") {
      fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${query}&units=imperial&APPID=88dc04c24e0e5db12db28e304cdca6a0`
      )
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery("");
          console.log(result);
        });
    }
  };

  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${month} ${date}, ${year}`;
  };

  return (
    <>
      <div className="main">
        <div
          className={
            typeof weather.main != "undefined"
              ? weather.main.temp <= 32
                ? "weather-app-cold"
                : weather.main.temp < 65
                ? "weather-app-warm"
                : weather.main.temp > 65
                ? "weather-app-hot"
                : "weather-app"
              : "weather-app"
          }
        >
          <main className="weather-main">
            <div className="main-div">
              <div className="search-box">
                <input
                  type="text"
                  className="search-bar"
                  placeholder="Search a Location..."
                  onChange={(e) => setQuery(e.target.value)}
                  value={query}
                  onKeyDown={fetchWeatherInfo}
                />
              </div>
              {typeof weather.main != "undefined" ? (
                <div>
                  <div className="location-box">
                    <div className="location">
                      {weather.name}, {weather.sys.country}
                    </div>
                    <div className="date">{dateBuilder(new Date())}</div>
                  </div>
                  <div className="weather-box">
                    <div className="temp">
                      {Math.round(weather.main.temp)}°f
                    </div>
                    <div className="weather">{weather.weather[0].main}</div>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default WeatherSearch;
