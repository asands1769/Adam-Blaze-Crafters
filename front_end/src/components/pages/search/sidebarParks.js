import React, { useEffect, useState } from 'react';
import "../../../index.css";
import "./searchStyles.css";
// import geoJson from "./data/geolocation_MO_parks.json";


const SidebarParks = () => {

  const [val, setVal] = useState(null);
  const [data, setData] = useState([]);
  const urlParkLocations = "http://localhost:8080/parks";


  // Fetching trail_blazer database
  const fetchInfo = async () => {
    await fetch(urlParkLocations)
      .then((res) => res.json())
      .then((d) => setData(d))
  }

  useEffect(() => {
    fetchInfo();
  }, []);

  // Sorting database by name column
  const sortedData = data.sort((a, b)=>{
    if(a.name < b.name){
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  })

  // displaying only name and url
  const nameUrlItems = sortedData.map(d => 
      <li key={d.id} className='park-list'>
        <a href={d.url}>{d.name}</a>
      </li>
    )

    // Adding an event to update state park list
    const click = (event) =>{
      event.preventDefault();
      alert(val)
    }
    const change = event => {
        setVal(event.target.value)
    }


  return (
      <div>
        <div>
        <h2>Missouri State Parks</h2>
        <form>
            <input className="search-parks" onChange={change} type="search" placeholder="Enter City, Zip Code, Park Name"/>
            <button onClick = {click}>Find</button>
            </form>
        <div className='sidebar-size'>
        {nameUrlItems}
        </div>
        </div>
        </div>
        );
};
 
export default SidebarParks;