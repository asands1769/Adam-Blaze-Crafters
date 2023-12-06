// HikeList.js
import React from 'react';

const HikeList = ({ hikes, onDelete, onEdit }) => {
  return (
    <div>
      <h2>Hike List</h2>
      <ul>
        {hikes.map((hike) => (
          <li key={hike.id}>
            {hike.name} - {hike.location}
            <button onClick={() => onEdit(hike)}>Edit</button>
            <button onClick={() => onDelete(hike.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HikeList;
