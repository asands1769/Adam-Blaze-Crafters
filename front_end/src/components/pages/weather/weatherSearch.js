import React, { useState, useEffect } from "react";
import "../weather/weatherStyles.css";

const WeatherSearch = () => {
  const [data, setData] = useState([]);
  const [lon, setLon] = useState(null);
  const [lat, setLat] = useState(null);
  const parksArray = data.map((park) => park);

  //fetch park locations from database
  //set coordinates to use in weather api fetch
  const fetchInfo = async () => {
    await fetch("http://localhost:8080/parks")
      .then((res) => res.json())
      .then((d) => setData(d));
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const setLatitude = (e) => {
    const selectedValue = e.target.value;
    parksArray.find((park) => {
      if (Number(park.id) === Number(selectedValue)) {
        setLat(park.latitude);
        console.log(park.name);
      }
      return lat;
    });
    console.log(lat);
  };

  const setLongitude = (e) => {
    const selectedValue = e.target.value;
    parksArray.find((park) => {
      if (Number(park.id) === Number(selectedValue)) {
        setLon(park.longitude);
      }
      return lon;
    });
    console.log(lon);
  };

  const setCoordinates = (e) => {
    setLatitude(e);
    setLongitude(e);
    fetchWeatherInfo();
  };

  //weather api fetch
  const [weather, setWeather] = useState({});
  const api = {
    key: "88dc04c24e0e5db12db28e304cdca6a0",
    base: "http://api.openweathermap.org/geo/1.0/",
  };

  const fetchWeatherInfo = () => {
    fetch(`${api.base}reverse?lat=${lat}&lon=${lon}&limit=1&appid=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        setWeather(result);
        console.log(result);
      });
  };

  const displayWeather = (e) => {
    const location = e.target.value;
    console.log(location);
  };

  return (
    <>
      <h1>Park Weather</h1>
      <div>
        <select onChange={setCoordinates}>
          <option value="placeholder">Select a Park</option>
          {parksArray.map((park) => (
            <option key={park.id} value={park.id}>
              {park.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <div className="main-div">
          {typeof weather.main != "undefined" ? (
            <div>
              <div className="location-box">
                <div className="location">
                  {displayWeather}, {weather.sys.country}
                </div>
              </div>
              <div className="weather-box">
                <div className="temp">{Math.round(weather.main.temp)}°f</div>
                <div className="weather">{weather.weather[0].main}</div>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default WeatherSearch;
