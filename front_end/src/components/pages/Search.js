import React from "react";
import "../../index.css";
 
const Home = () => {
    return (
        <div>
            <h1>
                Find a park by zip code.
            </h1>
            <div class="location-sidebar" id="location-display"></div>
            <form method="POST" action="">
            <input type="text" placeholder="Enter City, Zip Code, Park or Trial Name"/>

            </form>

            <div class="missouri-map" id="map"></div>
        </div>
    );
};
 
export default Home;