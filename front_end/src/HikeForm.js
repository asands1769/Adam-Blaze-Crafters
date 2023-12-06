// HikeForm.js
import React, { useState, useEffect } from 'react';

const HikeForm = ({ onSubmit, selectedHike, onEdit }) => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');

  useEffect(() => {
    if (selectedHike) {
      setName(selectedHike.name);
      setLocation(selectedHike.location);
    }
  }, [selectedHike]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedHike) {
      onEdit({ ...selectedHike, name, location });
    } else {
      onSubmit({ name, location });
    }

    setName('');
    setLocation('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{selectedHike ? 'Edit Hike' : 'Add Hike'}</h2>
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label>
        Location:
        <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
      </label>
      <button type="submit">{selectedHike ? 'Update Hike' : 'Add Hike'}</button>
    </form>
  );
};

export default HikeForm;
