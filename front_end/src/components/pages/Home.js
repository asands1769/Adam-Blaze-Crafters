import React from "react";
import Search from "./search/Search" 
const Home = () => {
    return (
        <div>
            <h1>Missouri State Parks</h1>
            <h3>Log in to start tracking your trips to these beautiful state parks.</h3>
            <p>Search by the park's name or hover over the map to find the location. Click the name to be taken to the Missouri State Park website to help you detail your tirp.</p>
        <Search />
        </div>
    );
};
 
export default Home;