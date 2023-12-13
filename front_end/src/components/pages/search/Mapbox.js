import mapboxgl from 'mapbox-gl';
import React, { useEffect, useRef } from 'react';
// import { } from 'react-map-gl';
import "../../../index.css";
import "./searchStyles.css";
import 'mapbox-gl/dist/mapbox-gl.css';
import geoJson from "./data/geolocation_MO_parks.json";
mapboxgl.accessToken = 'pk.eyJ1IjoiZHVzdGluZnJpZXNlbiIsImEiOiJjbHB0eDVyN2cwZmx0Mmtuem8zZDJua3lmIn0.tDrxvISZrAzUKW_VUv9zqg';


const Mapbox = () => {
     const mapContainerRef = useRef(null);
    
     const nameArray = [];
    for (let i = 0; i < geoJson.length; i++) {
      nameArray.push(geoJson[i].name);
    }
   

     // Initialize map when component mounts
  useEffect(() => {
    let map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-92.554322, 38.390511],
      zoom: 6,
    });
    for (const marker of geoJson.features) {
      // Create a DOM element for each marker.
      const el = document.createElement('div');
      el.className = 'marker';
      el.style.backgroundImage = `url(https://cdn-icons-png.flaticon.com/128/819/819814.png?ga=GA1.1.1815557627.1701965859)`;
      el.style.width = `8%`;
      el.style.height = `8%`;
      el.style.backgroundSize = '100%';
      el.style.cursor = `pointer`;
   
  // Add markers to the map.
    new mapboxgl.Marker(el)
    .setLngLat(marker.geometry.coordinates)
    .addTo(map);
    }
  }, []);

  return (
    <div className='row'>
    <div id='sidebarOfNames'></div>
    <div className="map-container" ref={mapContainerRef}></div>
    </div>
  );
  
}
export default Mapbox;