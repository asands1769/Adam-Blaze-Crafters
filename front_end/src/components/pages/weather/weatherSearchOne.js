import React, { useState, useEffect } from "react";
import "../weather/weatherStyles.css";

const WeatherSearch = () => {
  //fetch park data to set longitude and latitude
  const [data, setData] = useState([]);
  const [lon, setLon] = useState();
  const [lat, setLat] = useState();
  const [selectedPark, setSelectedPark] = useState(null);
  const urlParkLocations = "http://localhost:8080/parks";
  //fetch data from database
  const fetchInfo = async () => {
    await fetch(urlParkLocations)
      .then((res) => res.json())
      .then((d) => setData(d));
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const parksArray = data.map((park) => park);

  const setLongitude = (e) => {
    const selectedValue = e.target.value;
    const selectedParkLon = parksArray.find(
      (park) => park.longitude === selectedValue
    );
    console.log(selectedValue);
    setLon(selectedParkLon);
  };

  const setLatitude = (e) => {
    const selectedValue = e.target.value;
    const selectedParkLat = parksArray.find(
      (park) => park.latitude === selectedValue
    );
    setLat(selectedParkLat);
  };

  const setCoordinates = (e) => {
    setLongitude(e);
    setLatitude(e);
    fetchWeatherInfo();
  };

  const [weather, setWeather] = useState({});
  const api = {
    key: "88dc04c24e0e5db12db28e304cdca6a0",
    base: "https://api.openweathermap.org/geo/1.0/",
  };

  //fetch weather data from open weather map api
  async function fetchWeatherInfo(e) {
    //if (e.value === ) {
    let response = await fetch(
      `${
        api.key
      }reverse?lat=${-92.76354566426453}&lon=${37.96786290349126}&limit=1&appid=${
        api.base
      }`
    );
    let data = await response.json();
    console.log(data);
    setWeather(data);
    setLon();
    setLat();
    //}
  }
  fetchWeatherInfo();
  //create current date to display when location is searched
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
      <div className="park-container">
        <div>
          <select onChange={setCoordinates}>
            <option value="placeholder">Select a Park</option>
            {parksArray.map((park) => (
              <option key={park.id}>{park.name}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="weather-container">
        <div className={"weather-app"}>
          <div className="weather-main">
            <div className="main-div">
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
          </div>
        </div>
      </div>
    </>
  );
};

export default WeatherSearch;

// <div className="search-box">
//                 <input
//                   type="text"
//                   className="search-bar"
//                   placeholder="Search a Location..."
//                   onChange={(e) => setQuery(e.target.value)}
//                   value={query}
//                   onKeyDown={fetchWeatherInfo}
//                 />
//               </div>

// typeof weather.main != "undefined"
// ? weather.main.temp <= 32
//     ? "weather-app-cold"
//     : weather.main.temp < 65
//     ? "weather-app-warm"
//     : weather.main.temp > 65
//     ? "weather-app-hot"
//     : "weather-app"
// :
