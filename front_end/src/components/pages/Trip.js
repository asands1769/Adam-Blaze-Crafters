// App.js
import React, { useState, useEffect } from 'react';
import HikeList from './trip/HikeList';
import HikeForm from './trip/HikeForm';

const Trip = () => {
  const [hikes, setHikes] = useState([]);
  const [selectedHike, setSelectedHike] = useState(null);

  useEffect(() => {
    // Load hikes from local storage on mount
    const storedHikes = JSON.parse(localStorage.getItem('hikes')) || [];
    setHikes(storedHikes);
 
  }, []);

  useEffect(() => {
    // Save hikes to local storage whenever the state changes
    localStorage.setItem('hikes', JSON.stringify(hikes));
  }, [hikes]);

  const handleAddHike = (newHike) => {
    setHikes([...hikes, { ...newHike, id: Date.now() }]);
  };

  const handleEditHike = (editedHike) => {
    setHikes(hikes.map((hike) => (hike.id === editedHike.id ? editedHike : hike)));
    setSelectedHike(null);
  };

  const handleDeleteHike = (id) => {
    // Display a confirmation dialog
    const isConfirmed = window.confirm("Are you sure you want to delete this hike?");
    
    if (isConfirmed) {
      setHikes(hikes.filter((hike) => hike.id !== id));
    }
  };

  const handleEditClick = (hike) => {
    setSelectedHike(hike);
  };

  return (
    <div className='page-container'>
      <HikeForm onSubmit={handleAddHike} selectedHike={selectedHike} onEdit={handleEditHike} />
      <HikeList hikes={hikes} onDelete={handleDeleteHike} onEdit={handleEditClick} />
    </div>
  );
};

export default Trip;
