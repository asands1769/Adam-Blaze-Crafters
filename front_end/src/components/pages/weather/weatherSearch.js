import React, { useState, useEffect } from "react";

const WeatherSearch = () => {

    async function fetchWeatherData() {
        let response = await fetch('http://api.openweathermap.org/geo/1.0/direct?q=Missouri&limit=5&appid=88dc04c24e0e5db12db28e304cdca6a0');
        let data = await response.json();

        console.log(data);
    }

    return (
        <>
            <button onClick={fetchWeatherData}>click me</button>
        </>
    )

}

export default WeatherSearch;