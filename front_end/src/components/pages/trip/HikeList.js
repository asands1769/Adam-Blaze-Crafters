// HikeList.js

import React, { useEffect, useState } from 'react';
import './historystyles.css';

const HikeList = ({ hikes, onDelete, onEdit }) => {
  const [data, setData] = useState([]);
  const urlTrips = "http://localhost:8080/trips";

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
      <div class="hike-list-container">
      {hikes.map((hike) => (
        <div key={hike.id} className="hike-card">
          <strong>{hike.name}</strong>
          <p>Trail Location:  {hike.location}</p>
          <p>Hike Date:  {hike.date}</p>
          <p>Hike Notes:  {hike.notes}</p>
          <button onClick={() => onEdit(hike)}>Edit</button>
          <button onClick={() => onDelete(hike.id)}>Delete</button>
        </div>
      ))}
      </div>
      <h3>Saved Trips</h3>
      <div class="hike-list-container">
      {reverseOrder.map((trip) => (
        <div key={trip.id} className="hike-card">
          <strong>{trip.tripName}</strong>
          <p>Trail Location:  {trip.location}</p>
          <p>Hike Date:  {trip.date}</p>
          <p>Hike Notes:  {trip.notes}</p>
          {/* <p>Plants Fount: {trip.plants}</p> */}
          <button onClick={() => onEdit(trip)}>Edit</button>
          <button onClick={() => onDelete(trip.id)}>Delete</button>
        </div>
      ))}
      </div>
    </div>
  );
};

export default HikeList;
