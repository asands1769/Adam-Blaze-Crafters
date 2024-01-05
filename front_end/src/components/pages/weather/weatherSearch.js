import React, { useState, useEffect } from "react";
import "../weather/weatherStyles.css";

const WeatherSearch = () => {
  const [data, setData] = useState([]);
  const [lon, setLon] = useState(null);
  const [lat, setLat] = useState('');
  const [click, setClick] = useState('');
  const parksArray = data.map((park) => park);

  //fetch park locations from database
  //set coordinates to use in weather api fetch
  const fetchInfo = async () => {
    await fetch("http://localhost:8080/parks")
      .then((res) => res.json())
      .then((d) => setData(d));
    console.log(data);
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const setLatitude = (e) => {
    const selectedValue = e.target.value;
    parksArray.filter(
        (park) => {
            if(park.id == selectedValue){
                setLat(park.latitude);
            }
        }
    );
    console.log(lat);
  };

  const setLongitude = (e) => {
    const selectedPark = e.target.value;

    console.log(selectedPark);
  };

  const setCoordinates = (e) => {
    setLatitude(e);
    // setLongitude(e);
    //fetchWeatherInfo(e);
  };

  //weather api fetch
  const [weather, setWeather] = useState({});
  const api = {
    key: "88dc04c24e0e5db12db28e304cdca6a0",
    base: "https://api.openweathermap.org/geo/1.0/",
  };


  const fetchWeatherInfo = (e) => {
    fetch(`${api.base}reverse?lat=${lat}&lon=${lon}&limit=1&appid=${api.key}`)
    .then(res => res.json())
    .then(result => {
        if(result.result === "Ok"){
            setWeather(result);
            console.log(result);
        }else{
            throw new Error ("Oops! Something went wrong.");
        }
    }).catch(err => console.log(err));
  }

  return (
    <>
      <h1>Park Weather</h1>
      <div>
        <select
        onChange={setCoordinates}
        >
          <option value="placeholder">Select a Park</option>
          {parksArray.map((park) => (
            <option key={park.id} value={park.id}>
              {park.name}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default WeatherSearch;
