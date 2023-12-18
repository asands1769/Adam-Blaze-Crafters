// import React, { useEffect, useState } from 'react';
import "../../../index.css";
import "./searchStyles.css";
import SidebarParks from './sidebarParks';
// import Mapbox from './Mapbox';
import FilterMap from './FilterMap';


const Home = () => {
 
    return (
        <>
            <h1>Find A Missouri State Park</h1>                
            <div className='row'>
                <FilterMap />
            </div>
        </>
        );
};
 
export default Home;