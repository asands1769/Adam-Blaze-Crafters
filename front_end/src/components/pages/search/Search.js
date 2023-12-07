import React, { useEffect, useState } from 'react';
import "../../../index.css";
import "./searchStyles.css";
// import ReactMapGL, { Marker, Popup} from "react-map-gl";


const Home = () => {
  //   const [viewport, setViewport] = useState({
  //   latitude: 38.390511,
  //   longitude: -92.554322,
  //   width: "400px",
  //   height: "400px",
  //   zoom: 6
  // });
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

    return (
        <>
            <h1>
                Find a park by zip code.
            </h1>
            
            <form method="POST" action="">
            <input type="text" placeholder="Enter City, Zip Code, Park or Trial Name"/>
            </form>
            <div class="row">
            <ul>
                {data.map((park, index) => {
                    return(<li key={index}>{park.name}</li>)
                })}
            </ul>
            
           <div>
            {/* <ReactMapGL
              {...viewport}
              mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
              mapStyle="mapbox://styles/leighhalliday/cjufmjn1r2kic1fl9wxg7u1l4"
              onViewportChange = {viewport => {
                setViewport(viewport);
              }}
          
            > */}
              {/* {data.map((park, index) => {
                return <Marker key={index} 
                  latitude={park.x}
                  longitude={park.y}
                >
                  <button className="marker-btn">
                    <img src="../images/front_end/src/components/images/signboard_3730952.png" alt="wooden sign pointing in the direction of a hike."/>
                  </button>
                </Marker>
              })} */}
            {/* </ReactMapGL> */}
            </div>
        </div>

        </>
        );
};
 
export default Home;