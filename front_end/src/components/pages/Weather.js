import React from "react";
import WeatherSearch from "./weather/weatherSearch";
 
const Weather = () => {
    return (
        <div>
            <h1>
                Find weather for a park here.
            </h1>
            <div>
                <WeatherSearch />
            </div>
        </div>
    );
};
 
export default Weather;