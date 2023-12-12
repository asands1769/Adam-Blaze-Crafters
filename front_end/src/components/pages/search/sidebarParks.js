import React, { useEffect, useState } from 'react';
import "../../../index.css";
import "./searchStyles.css";
// import geoJson from "./data/geolocation_MO_parks.json";


const SidebarParks = () => {


  const [data, setData] = useState([]);
  const urlParkLocations = "http://localhost:8080/parks";

  const fetchInfo = () => {
    fetch(urlParkLocations)
      .then((res) => res.json())
      .then((d) => setData(d))
  }

  useEffect(() => {
    fetchInfo();
  }, []);

const nameArray = [];
    for (let i = 0; i < data.length; i++) {
      nameArray.push(data[i].name);
    }
  const sortedNames = nameArray.sort();

  const listedNames = sortedNames.map((names) => 
    <div><a href="/">{names}</a></div>
  );



    return (
      <div>
        <div>
        <h2>Missouri State Parks</h2>
        <form method="POST" action="">
            <input type="text" placeholder="Enter City, Zip Code, Park or Trial Name"/>
            </form>
        <div className='sidebar-size'>
        {listedNames}
        </div>
        </div>
        </div>
        );
};
 
export default SidebarParks;