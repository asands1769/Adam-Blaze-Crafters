import React, { useRef, useEffect, useState } from 'react';
import "../../index.css";
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
mapboxgl.accessToken = 'pk.eyJ1IjoiZHVzdGluZnJpZXNlbiIsImEiOiJjbHB0eDVyN2cwZmx0Mmtuem8zZDJua3lmIn0.tDrxvISZrAzUKW_VUv9zqg';

const Home = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState();
  const [lat, setLat] = useState();
  const [zoom, setZoom] = useState();
  const [data, setData] = useState();

useEffect(() => {
  if (map.current) return; // initialize map only once
  map.current = new mapboxgl.Map({
  container: mapContainer.current,
  style: 'mapbox://styles/mapbox/streets-v12',
  center: [-92.554322,38.390511],
  zoom: 5
  });
  });

  useEffect(() => {
    fetch('http://localhost:8080/parks')
    .then(response => response.json())
    .then(data => setData(data))
    .catch(error => console.error(error));
    }, []);

    useEffect(() => {data.forEach(({ name, x, y }) => {
        const popup = new mapboxgl.Popup({ offset: 25 }).setText(name);

        //add a marker
        new mapboxgl.Marker({
            scale: 0.7
        })
        .setLngLat([x,y])
        .setPopup(popup)
        .addTo(map);
    })})

    return (
        <>
        <div>
            <h1>
                Find a park by zip code.
            </h1>
            
            <form method="POST" action="">
            <input type="text" placeholder="Enter City, Zip Code, Park or Trial Name"/>
            </form>
            <div class="location-sidebar" id="location-display">Sidebar with parks</div>
            <tbody>
            {data.map((user, index) => (
              <tr>
                <th scope="row" key={index}>
                  {index + 1}
                </th>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
            </tr>))}
          </tbody>
            
            <div>
                <div ref={mapContainer} className="map-container" />
            </div>

        </div>
        
        </>
        );
};
 
export default Home;