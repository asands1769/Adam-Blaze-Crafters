import React, { useEffect, useState } from 'react';
import "../../../index.css";
import "./searchStyles.css";
import SidebarParks from './sidebarParks';
import Mapbox from './Mapbox';


const Home = () => {
 
    return (
        <>
            <h1>
                Find a park by zip code.
            </h1>
            
           <div className='row'>
           <SidebarParks /> 
           <Mapbox />
            </div>
      

        </>
        );
};
 
export default Home;