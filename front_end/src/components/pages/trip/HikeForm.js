// HikeForm.js
import React, { useState, useEffect } from 'react';
import csvData from '../../../databases/park_locations/MO_State_Park_and_Historic_Sites_Trails.csv';

const HikeForm = ({ onSubmit, selectedHike, onEdit }) => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [notes, setNotes] = useState('');
  const [category, setCategory] = useState('');
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    // Fetch and parse the CSV file
    const fetchData = async () => {
      try {
        const response = await fetch(csvData);
        const textData = await response.text();

        // Parse CSV data without using PapaParse
        const rows = textData.split('\n');
        const header = rows[0].split(',');
        const data = rows.slice(1).map((row) => {
          const values = row.split(',');
          if (values.length === header.length) {
            return header.reduce((acc, key, index) => {
              acc[key.trim()] = values[index].trim();
              return acc;
            }, {});
          } else {
            console.error('Row with missing values:', row);
            return null;
          }
        }).filter(Boolean); // Filter out rows with missing values

        console.log('Parsed CSV Data:', data);
        setLocations(data);
      } catch (error) {
        console.error('Error fetching or parsing CSV:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to fetch locations only once on component mount

  useEffect(() => {
    // Populate form fields when selectedHike changes
    if (selectedHike) {
      setName(selectedHike.name || '');
      setLocation(selectedHike.location || '');
      setDate(selectedHike.date || '');
      setNotes(selectedHike.notes || '');
      setCategory(selectedHike.category || ''); // Populate category field for editing
    }
  }, [selectedHike]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const hikeData = { name, location, date, notes, category };
    if (selectedHike) {
      onEdit({ ...selectedHike, ...hikeData });
    } else {
      onSubmit(hikeData);
    }

    // Reset form fields
    setName('');
    setLocation('');
    setDate('');
    setNotes('');
    setCategory('');
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
        {/* Use a dropdown select element */}
        <select value={location} onChange={(e) => setLocation(e.target.value)} required>
          <option value="" disabled>Select a location</option>
          {locations.map((loc, index) => (
            <option key={index} value={loc.LOC_NAME}>
              {loc.LOC_NAME}
            </option>
          ))}
        </select>
      </label>
      <label>
        Date:
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
      </label>
      <label>
        Notes:
        <textarea value={notes} onChange={(e) => setNotes(e.target.value)} />
      </label>
      <label>
        Category:
        <select value={category} onChange={(e) => setCategory(e.target.value)} required>
          <option value="" disabled>Select a category</option>
          <option value="Past">Past Trip</option>
          <option value="Future">Future Trip</option>
        </select>
      </label>
      <button type="submit">{selectedHike ? 'Update Hike' : 'Add Trip'}</button>
    </form>
  );
};

export default HikeForm;
