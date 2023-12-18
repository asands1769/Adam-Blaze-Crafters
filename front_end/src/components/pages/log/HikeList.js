// HikeList.js
import React from 'react';
import './historystyles.css';

const HikeList = ({ hikes, onDelete, onEdit }) => {
  return (
    <div id="hike-list-container">
      <h2>Hike List</h2>
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
  );
};

export default HikeList;
