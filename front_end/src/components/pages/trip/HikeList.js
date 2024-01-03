// HikeList.js
// import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import './historystyles.css';

const HikeList = ({ hikes, onEdit }) => {
  const [data, setData] = useState([]);
  
  // const navigate = useNavigate();
  const urlTrips = "http://localhost:8080/trips/all";

  // Fetching trail_blazer trips database
  const fetchInfo = async () => {
    await fetch(urlTrips)
      .then((res) => res.json())
      .then((d) => setData(d))
  }

  useEffect(() => {
    fetchInfo();
  }, []);

  const reverseOrder = data.sort((a, b) => a.id < b.id ? 1 : -1 );


    
  return (
    <div >
      <h2>Hike List</h2>
      <h3>Just Added</h3>
      <div className="hike-list-container">
      {hikes.map((hike) => (
        <div key={hike.id}  className="hike-card">
          <strong>{hike.name}</strong>
          <p>Trail Location:  {hike.location}</p>
          <p>Hike Date:  {hike.date}</p>
          <p>Hike Notes:  {hike.notes}</p>
        </div>
      ))}
      </div>
      <h3>Saved Trips</h3>
      <div className="hike-list-container">
      {reverseOrder.map((trip) => (
        <div key={trip.id} className="hike-card">
          <strong>{trip.tripName}</strong>
          <p style={{display: "none"}}>{trip.id}</p>
          <p>Trail Location:  {trip.location}</p>
          <p>Hike Date:  {trip.date}</p>
          <p>Hike Notes:  {trip.notes}</p>
          {/* <p>Plants Fount: {trip.plants}</p> */}
          <button id={trip.id} onClick={() => onEdit(trip)}>Edit</button>
          <button onClick={() => {
    const urlDelete = "http://localhost:8080/trips/delete/" + trip.id;
    let text = "Are you sure you want to delete this trip?";
    // eslint-disable-next-line no-restricted-globals
    if(confirm(text) == true){
      fetch(urlDelete, {method: 'DELETE'}).then((response) => {
      if(!response.ok){
        throw new Error('Something went wrong');
      }
      window.location.reload(false);
    })
    .catch((e) =>{
      console.log(e);
    });
    } else {
      return null;
    }
    
   }}
   >Delete</button>
        </div>
      ))}
      </div>
    </div>
  );
};

export default HikeList;
