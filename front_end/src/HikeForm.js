// HikeForm.js
import React, { useState, useEffect } from 'react';

const HikeForm = ({ onSubmit, selectedHike, onEdit }) => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (selectedHike) {
      setName(selectedHike.name);
      setLocation(selectedHike.location);
      setDate(selectedHike.date);
      setNotes(selectedHike.notes);
    }
  }, [selectedHike]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedHike) {
      onEdit({ ...selectedHike, name, location, date, notes });
    } else {
      onSubmit({ name, location, date, notes });
    }

    // Reset form fields
    setName('');
    setLocation('');
    setDate('');
    setNotes('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{selectedHike ? 'Edit Hike' : 'Add Trip'}</h2>
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </label>
      <label>
        Location:
        <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required />
      </label>
      <label>
        Date:
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
      </label>
      <label>
        Notes:
        <textarea value={notes} onChange={(e) => setNotes(e.target.value)} />
      </label>
      <button type="submit">{selectedHike ? 'Update Hike' : 'Add Trip'}</button>
    </form>
  );
};

export default HikeForm;
