import React, { useState, useEffect } from "react";
import "../weather/weatherStyles.css";

const WeatherSearch = () => {
  const [data, setData] = useState([]);
  const [lon, setLon] = useState(null);
  const [lat, setLat] = useState(null);
  const [parkName, setParkName] = useState("");
  const [weather, setWeather] = useState({});
  const parksArray = data.map((park) => park);
  const api = {
    key: "88dc04c24e0e5db12db28e304cdca6a0",
    base: "https://api.openweathermap.org/data/2.5/",
  };
  let weatherLoaded = false;

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

  useEffect(() => {
    weatherLoaded = true;
  }, [weather]);

  useEffect(() => {
    fetchWeatherInfo();
  }, [lon]);

  const setLatitude = (e) => {
    const selectedPark = e.target.value;
    parksArray.find((park) => {
      if (Number(park.id) === Number(selectedPark)) {
        setLat(park.latitude);
        setParkName(park.name);
      }
    });
  };

  const setLongitude = (e) => {
    const selectedValue = e.target.value;
    parksArray.find((park) => {
      if (Number(park.id) === Number(selectedValue)) {
        setLon(park.longitude);
      }
    });
  };

  const setCoordinates = (e) => {
    setLatitude(e);
    setLongitude(e);
  };

  //weather api fetch
  async function fetchWeatherInfo() {
    let response = await fetch(
      `${api.base}weather?lat=${lat}&lon=${lon}&appid=${api.key}&units=imperial`
    );
    let data = await response.json();
    setWeather(data);
  }

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
    <div className="page-container">
      <div className="weather-page">
        <h1>Park Weather</h1>
        <div className="parent-container">
          <div className="park-list child">
            <select className="weather-select" onChange={setCoordinates}>
              <option value="placeholder">Select a Park</option>
              {parksArray.map((park) => (
                <option key={park.id} value={park.id}>
                  {park.name}
                </option>
              ))}
            </select>
          </div>
          <div className="child">
            <div className="weather-main">
              {
                (weatherLoaded = true ? (
                  <div className="main-div">
                    {typeof weather.main != "undefined" ? (
                      <div>
                        <div className="location-box">
                          <div className="location">{parkName}</div>
                        </div>
                        <div className="date">{dateBuilder(new Date())}</div>
                        <div className="weather-box">
                          <div className="temp">
                            {Math.round(weather.main.temp)}°f
                          </div>
                          <div className="weather">
                            {weather.weather[0].main}
                          </div>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                ) : (
                  <p>Select a Park</p>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherSearch;
