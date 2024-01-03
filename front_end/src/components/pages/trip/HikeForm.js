import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import csvData from '../../../databases/park_locations/MO_State_Park_and_Historic_Sites_Trails.csv';
// import useForm from './UseForm';

const FORM_ENDPOINT = "http://localhost:8080/trips/add";

const HikeForm = ({ onSubmit, selectedHike, onEdit }) => {
  const [id, setId] = useState('');
  const [tripName, setTripName] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [notes, setNotes] = useState('');
  const [locations, setLocations] = useState([]);
  const navigate = useNavigate();
  
  // const formElement = useRef(null);
  const additionalData = {
    sent: new Date().toISOString(),
  };

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
      setId(selectedHike.id || '');
      setTripName(selectedHike.tripName || '');
      setLocation(selectedHike.location || '');
      setDate(selectedHike.date || '');
      setNotes(selectedHike.notes || '');
      document.getElementById("submit-form").style.display = "none";
      document.getElementById("update-form").style.display = "block";
      
    }
  }, [selectedHike]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalFormEndpoint = e.target.action;
    const data = Array.from(e.target.elements)
      .filter((input) => input.name)
      .reduce((obj, input) => Object.assign(obj, { [input.name]: input.value }), {});

    if (additionalData) {
      Object.assign(data, additionalData);
    }

    fetch(finalFormEndpoint, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (selectedHike) {
      onEdit({ ...selectedHike, tripName, location, date, notes });
    } else {
      onSubmit({ tripName, location, date, notes });
    }

    // Reset form fields
    setTripName('');
    setLocation('');
    setDate('');
    setNotes('');
  };

  function updateTrip(e){
      const finalFormEndpointUpdate = 'http://localhost:8080/trips/update/' + id;
      const updatedData = Array.from(e.target.elements)
      .filter((input) => input.name)
      .reduce((obj, input) => Object.assign(obj, { [input.name]: input.value }), {});

    if (additionalData) {
      Object.assign(updatedData, additionalData);
    
    }

    fetch(finalFormEndpointUpdate, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => {
        return response.json();
      })
      .then((updatedDate) => {

        console.log(updatedDate)
      });
    if (selectedHike) {
      onEdit({ ...selectedHike, id, tripName, location, date, notes });
    } else {
      onSubmit({ id, tripName, location, date, notes });
    }
  };

  return (
    <>
    <div id="submit-form">
    <form className='form-history' onSubmit={handleSubmit} method="POST" action={FORM_ENDPOINT}>
      <h2>Add Trip</h2>
      <label>
        Name:
        <input type="text" name="tripName" value={tripName} onChange={(e) => setTripName(e.target.value)} required />
      </label>
      <label>
        Location:
        {/* Use a dropdown select element */}
        <select name="location" value={location} onChange={(e) => setLocation(e.target.value)} required>
          <option value="" disabled>Select a location</option>
          {locations.map((loc) => (
            <option key={loc.ID} value={loc.LOC_NAME}>
              {loc.LOC_NAME}
            </option>
          ))}
        </select>
      </label>
      <label>
        Date:
        <input type="date" name="date" value={date} onChange={(e) => setDate(e.target.value)}  required />
      </label>
      <label>
        Notes:
        <textarea name="notes" value={notes} onChange={(e) => setNotes(e.target.value)} />
      </label>
      <button type="submit" id="btn-submit-trip">Add Trip</button>
    </form>
    </div>

    {/* UPDATE FORM */}
    <div id="update-form">
    <form className='form-history' onSubmit={updateTrip}>
      <h2>Edit Trip</h2>
      <input type="text" name="id" value={id} onChange={(e) => setId(e.target.value)} disabled style={{display: "none"}}/>
      <label>
        Name:
        <input type="text" name="tripName" value={tripName} onChange={(e) => setTripName(e.target.value)} required />
      </label>
      <label>
        Location:
        {/* Use a dropdown select element */}
        <select name="location" value={location} onChange={(e) => setLocation(e.target.value)} required>
          <option value="" disabled>Select a location</option>
          {locations.map((loc) => (
            <option key={loc.ID} value={loc.LOC_NAME}>
              {loc.LOC_NAME}
            </option>
          ))}
        </select>
      </label>
      <label>
        Date:
        <input type="date" name="date" value={date} onChange={(e) => setDate(e.target.value)} required />
      </label>
      <label>
        Notes:
        <textarea name="notes" value={notes} onChange={(e) => setNotes(e.target.value)} />
      </label>
      <button type="submit" id="btn-update-trip">Update Trip</button>
    </form>
    </div>
  </>
  );
};

export default HikeForm;
