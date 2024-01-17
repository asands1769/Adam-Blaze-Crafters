import React, { useState, useEffect } from 'react'; 
import csvData from '../../../databases/park_locations/MO_State_Park_and_Historic_Sites_Trails.csv';
import "./historystyles.css";
import { useAuth0 } from '@auth0/auth0-react';

const HikeForm = ({ onSubmit, selectedHike, onEdit }) => {
  const [id, setId] = useState("");
  const [tripName, setTripName] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");
  const [locations, setLocations] = useState([]);
  const [plants, setPlants] = useState([]);
  const [val, setVal] = useState("");
  const [data, setData] = useState([]);
  const [click, setClick] = useState("");
  const [fauna, setFauna] = useState([]);
  const [animal, setAnimal] = useState("");
  const [animals, setAnimals] = useState([]);
  const [clickedAnimal, setClickedAnimal] = useState("");
  const [toggle, setToggle] = useState(true);
  const { user } = useAuth0();
  const [userName] = useState(user.name);

  const FORM_ENDPOINT = "http://localhost:8080/trips/add";
  const urlPlants = "http://localhost:8080/plants";
  const updateForm = document.getElementById("update-form");
  const submitForm = document.getElementById("submit-form");   
    
// *** Fetch and Parse the CSV file *** //
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(csvData);
        const textData = await response.text();

        // Parse CSV data without using PapaParse
        const rows = textData.split("\n");
        const header = rows[0].split(",");
        const data = rows
          .slice(1)
          .map((row) => {
            const values = row.split(",");
            if (values.length === header.length) {
              return header.reduce((acc, key, index) => {
                acc[key.trim()] = values[index].trim();
                return acc;
              }, {});
            } else {
              //console.error('Row with missing values:', row);
              return null;
            }
          })
          .filter(Boolean); // Filter out rows with missing values

        //console.log('Parsed CSV Data:', data);
        setLocations(data);
      } catch (error) {
        //console.error('Error fetching or parsing CSV:', error);
      }
    };

    fetchData(); // Empty dependency array to fetch locations only once on component mount
  }, []);

// *** Populate Form Fields When SelectedHike Changes *** //
  useEffect(() => {
    if (selectedHike) {
      setId(selectedHike.id || "");
      setTripName(selectedHike.tripName || "");
      setLocation(selectedHike.location || "");
      setDate(selectedHike.date || "");
      setNotes(selectedHike.notes || "");
      setPlants(selectedHike.plants || "");
      setFauna(selectedHike.fauna || "");
      document.getElementById("submit-form").style.display = "none";
      document.getElementById("update-form").style.display = "block";
    }
  }, [selectedHike]);
 
// *** POST REQUEST FOR SUBMIT FORM *** //
  const handleSubmit = (e) => {
    e.preventDefault();
    const finalFormEndpoint = e.target.action;
    const data = {
      "tripName": tripName,
      "location": location,
      "date": date,
      "notes": notes,
      "plants": plants,
      "fauna": fauna,
      "userName" : userName
    };

    fetch(finalFormEndpoint, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (selectedHike) {
      onEdit({...selectedHike, tripName, location, date, notes, plants, fauna,});
    } else {
      onSubmit({ tripName, location, date, notes, plants, fauna, userName });
    }

    // Reset form fields
    setTripName("");
    setLocation("");
    setDate("");
    setNotes("");
    setPlants([]);
    setFauna([]);
    deleteCheckmarks();
  };

// *** PUT REQUEST FOR UPDATE FORM *** //
  function updateTrip() {
    const finalFormEndpointUpdate = "http://localhost:8080/trips/update/" + id;
    const updatedData = {
      tripName: tripName,
      location: location,
      date: date,
      notes: notes,
      plants: plants,
      fauna: fauna,
    };

    fetch(finalFormEndpointUpdate, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => {
        return response.json();
      })
      .then((updatedDate) => {});
    if (selectedHike) {
      onEdit({...selectedHike, id, tripName, location, date, notes, plants, fauna });
    } else {
      onSubmit({ id, tripName, location, date, notes, plants, fauna });
    }
  }

// **************** PLANTS DISPLAY **************** //

// *** Plants GET Request *** //
  const fetchInfo = async () => {
    await fetch(urlPlants)
      .then((res) => res.json())
      .then((d) => setData(d));
  };
  useEffect(() => {
    fetchInfo();
  }, []);

  // *** Plant Check Marks Repopulated With onEdit *** //
useEffect(() => {
  if (document.getElementById("update-form").style.display === "block") {
    const updateFormAddBtn = updateForm.querySelectorAll("#add-btn-plant");
    for (const chmk of updateFormAddBtn) {
      const markId =
        chmk.parentElement.parentElement.firstElementChild.firstChild.id;
      chmk.lastChild.style.visibility = "hidden";
      chmk.firstElementChild.disabled = false;
      chmk.lastElementChild.disabled = true;
      plants.map((plant) => {
        if (Number(plant.id) === Number(markId)) {
          chmk.lastChild.style.visibility = "visible";
          chmk.firstElementChild.disabled = true;
          chmk.lastElementChild.disabled = false;
        }
      });
      }
    }
  });

// *** Plant Image Display Event Variables: Setting 'change' Based On Event Provided In HTML Section And 'clicked' Based On Click To Display Image *** //
  const change = (event) => {
    setVal(event.target.value);
  };
  const clicked = (event) => {
    setClick(event.target.id);
  };

// *** Plant Search Bar Function To Display Input Change *** //
  const searchItems = data.filter((post) => {
    if (val === "") {
      return post;
    } else if (
      post.scientificName.toLowerCase().includes(val.toLowerCase()) ||
      post.commonName.toLowerCase().includes(val.toLowerCase())
    ) {
      return post;
    }
  });

// *** Plant Display checkbox, Name, Add Btn, And Delete Btn With Methods To Add Or Delete Plants From Array. *** //
  const displaySearchedItems = searchItems.map((post) => {
    return (
      <div key={post.id} className="margin-3" >
        <div className="add-plant-form">
          <div className="display-inline-block">
            <label id={post.id} onClick={clicked} className="label-plants">
              {" "}
              {`${post.scientificName} (${post.commonName})`}
            </label>
          </div>
          <div className="add-delete-plants">
            <div id="add-btn-plant">
              <button
                type="button"
                className="btn-plant add-btn-plant"
                onClick={(e) => {
                  setPlants([...plants, { id: Number(post.id) }]);
                  e.currentTarget.nextSibling.style.visibility = "visible";
                  e.currentTarget.disabled = true;
                  e.currentTarget.parentElement.parentElement.lastChild.disabled = false;
                }}
              >
                add
              </button>
              <img
                src="https://cdn2.iconfinder.com/data/icons/flat-ui-icons-24-px/24/checkmark-24-1024.png"
                alt="a checkmark, indicating the plant is associated with your current trip."
                className="checkbox-style"
                style={{ visibility: "hidden" }}
              />
            </div>
            <button
              type="button"
              className="btn-plant"
              onClick={(e) => {
                setPlants(plants.filter((a) => a.id !== post.id));
                e.currentTarget.parentElement.firstElementChild.lastChild.style.visibility =
                  "hidden";
                e.currentTarget.disabled = true;
                e.currentTarget.parentElement.firstChild.firstChild.disabled = false;
              }}
            >
              delete
            </button>
          </div>
        </div>
      </div>
    );
  });

// *** Plant Filter and Return a single post To Display A Plant Within Plant-container *** //
  const clickedItems = data.filter((post) => {
    if (Number(post.id) === Number(click)) {
      return post;
    }
  });

// *** Plant Display A Picture Of the Plant *** //
  const displayClickedItems = clickedItems.map((post) => {
    return (
      <div key={post.id}>
        <div className="pl-image-container">
          <h3 className='plant-title'>{post.scientificName}</h3>
          <img className="plant-img-size" src={post.image} alt={post.commonName} />
          <div className="photo-credit">
            <a href={post.photoCredit} target="_blank" rel="noreferrer">
              photo credit
            </a>
          </div>
        </div>
      </div>
    );
  });

// ******************** Animals ***************** //

// *** Animal GET Request *** //
  const fetchAnimalInfo = async () => {
    await fetch("http://localhost:8080/animals")
      .then((res) => res.json())
      .then((d) => setAnimals(d));
  };
  useEffect(() => {
    fetchAnimalInfo();
  }, []);

// *** Animal Check Marks Repopulated With onEdit *** //
useEffect(() => {
  if (document.getElementById("update-form").style.display === "block") {
    const updateAnimalFormAddBtn =
      updateForm.querySelectorAll("#add-btn-animal");
    for (const animalChmk of updateAnimalFormAddBtn) {
      const markAnimalId =
        animalChmk.parentElement.parentElement.firstElementChild.firstChild
          .id;
      animalChmk.lastChild.style.visibility = "hidden";
      animalChmk.firstElementChild.disabled = false;
      animalChmk.lastElementChild.disabled = true;

      fauna.map((item) => {
        if (Number(item.id) === Number(markAnimalId)) {
          animalChmk.lastChild.style.visibility = "visible";
          animalChmk.firstElementChild.disabled = true;
          animalChmk.lastElementChild.disabled = false;
        }
      });
    }
  }
});

// *** Animal Assigning Variables Through Events To Display Image Of Animal *** //
  const changeAnimal = (e) => {
    setAnimal(e.target.value);
  };
  const animalClicked = (e) => {
    setClickedAnimal(e.target.id);
  };
// *** Search Bar Function To Filter List Of Animals According To What The User Inputs In Search Bar *** //
  const searchFauna = animals.filter((filteredAnimal) => {
    if (animal === "") {
      return filteredAnimal;
    } else if (
      filteredAnimal.scientificName
        .toLowerCase()
        .includes(animal.toLowerCase()) ||
      filteredAnimal.commonName.toLowerCase().includes(animal.toLowerCase)
    ) {
      return filteredAnimal;
    }
  });
// *** Animal List Of Animals With Add Btn, Delete Btn, Name Of Animal, And Check Mark *** //
  const displaySearchedAnimals = searchFauna.map((post) => {
    return (
      <div key={post.id} className="margin-3">
        <div className="add-plant-form">
          <div className="display-inline-block">
            <label
              id={post.id}
              onClick={animalClicked}
              className="label-plants"
            >
              {" "}
              {`${post.commonName} (${post.scientificName})`}
            </label>
          </div>
          <div className="add-delete-plants">
            <div id="add-btn-animal">
              <button
                type="button"
                className="btn-plant add-btn-plant"
                onClick={(e) => {
                  setFauna([...fauna, { id: Number(post.id) }]);
                  e.currentTarget.nextSibling.style.visibility = "visible";
                  e.currentTarget.disabled = true;
                  e.currentTarget.parentElement.parentElement.lastChild.disabled = false;
                }}
              >
                add
              </button>
              <img
                src="https://cdn2.iconfinder.com/data/icons/flat-ui-icons-24-px/24/checkmark-24-1024.png"
                alt="a checkmark, indicating the plant is associated with your current trip."
                className="checkbox-style"
                style={{ visibility: "hidden" }}
              />
            </div>
            <button
              type="button"
              className="btn-plant"
              onClick={(e) => {
                setFauna(fauna.filter((a) => a.id !== post.id));
                e.currentTarget.parentElement.firstElementChild.lastChild.style.visibility =
                  "hidden";
                e.currentTarget.disabled = true;
                e.currentTarget.parentElement.firstChild.firstChild.disabled = false;
              }}
            >
              delete
            </button>
          </div>
        </div>
      </div>
    );
  });

// *** Animal Filter To Display Information Of Animal Within Container *** //
  const selectedAnimal = animals.filter((item) => {
    if (Number(item.id) === Number(clickedAnimal)) {
      return item;
    }
  });

// *** Animal Display Image of Animal *** // 
  const displayClickedAnimal = selectedAnimal.map((animal) => {
    return (
      <div key={animal.id} className="flex">
        <div className="image-container">
          <img className="plant-img-size" 
            src={animal.image}
            alt={animal.commonName}
          />
          <div className="photo-credit">
            {animal.commonName}
            <br />
            <a href={animal.photoCredit} target="_blank" rel="noreferrer">
              photo credit
            </a>
          </div>
        </div>
      </div>
    );
  });

// *** Plants/Animals Delete Check Marks After Submit *** //
function deleteCheckmarks(){
  const submitCheckbox = submitForm.querySelectorAll("#add-btn-plant");
  const animalCheckbox = submitForm.querySelectorAll("#add-btn-animal");
    for (const chmk of submitCheckbox){
      chmk.lastChild.style.visibility = "hidden";
      chmk.firstElementChild.disabled = false;
      chmk.lastElementChild.disabled = true;
      }
    for (const anchmk of animalCheckbox){
      anchmk.lastChild.style.visibility = "hidden";
      anchmk.firstElementChild.disabled = false;
      anchmk.lastElementChild.disabled = true;
    }
}

// *** Plant/Animals Toggle Between The Selection Containers *** //
  const handleToggleClick = () => {
    setToggle(!toggle);
    if (!toggle) {
      document.getElementById("toggle-btn").innerHTML = "Animals Of Missouri";
      document.getElementById("toggle-animals").style.display = "none";
      document.getElementById("toggle-plants").style.display = "block";
      //Edit Trip
      document.getElementById("toggle-btn-edit").innerHTML = "Animals of Missouri";
      document.getElementById("toggle-animals-edit").style.display = "none";
      document.getElementById("toggle-plants-edit").style.display = "block";
    } else {
      document.getElementById("toggle-btn").innerHTML = "Plants of Missouri";
      document.getElementById("toggle-plants").style.display = "none";
      document.getElementById("toggle-animals").style.display = "block";
      //Edit Trip
      document.getElementById("toggle-btn-edit").innerHTML = "Plants";
      document.getElementById("toggle-plants-edit").style.display = "none";
      document.getElementById("toggle-animals-edit").style.display = "block";
    }
    return toggle;
  };

// *************** Form Return *************** //
  return (
    <div>
{/* *** Submit Form Return */}
      <div id="submit-form">
        <form onSubmit={handleSubmit} method="POST" action={FORM_ENDPOINT}>
          <div className="trip-parent-container">
            <div className="left-container"> {/* *** Submit Form *** */}
              <h2>Add Trip</h2>
              <label>
                Name:
                <input
                  type="text"
                  name="tripName"
                  value={tripName}
                  onChange={(e) => setTripName(e.target.value)}
                  required
                />
              </label>
              <label>
                Location:
                <select
                  className="display-block select-style"
                  name="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                >
                  <option value="" disabled>
                    Select a location
                  </option>
                  {locations.map((loc) => (
                    <option key={loc.ID} value={loc.LOC_NAME}>
                      {loc.LOC_NAME}
                    </option>
                  ))}
                </select>
              </label>
              <label className="display-block">
                Date:
                <input
                  type="date"
                  name="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </label>
              <label>
                Notes:
                <textarea
                  name="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </label>
              <button type="submit" id="btn-submit-trip">
                Add Trip
              </button>
            </div>
{/* *** Submit Form Plant/Animal Buttons And Image Display *** */}
            <div className='tggl-display'>
{/* *** Submit Form Toggle Button *** */}
              <button type="button" id="toggle-btn" onClick={handleToggleClick} className='toggle-btn'>
                Animals Of Missouri
              </button>

{/* *** PLANTS DISPLAY *** */}
              <div className="middle-container" id="toggle-plants" style={{ display: "block" }}>
                <h2>Plants of Missouri</h2>
                <div className="row main-container">
                  <div className="leftside-container">
                    <div className="search-container">
                      <div className="sidebar-size-plants">
                        <input
                          className="search-plants"
                          onChange={change}
                          placeholder="Find a plant by scientific or common name"
                        />
                        {displaySearchedItems}
                      </div>
                      <div className="small">
                        <small>
                          *List is not a comprehensive of all plants in Missouri
                        </small>
                      </div>
                      <div className="small">
                        <small>
                          *Data provided by{" "}
                          <a href="https://ecos.fws.gov/ecp0/reports/ad-hoc-species-report-input">
                            U.S Fish & Wildlife Service: ECOS
                          </a>
                        </small>
                      </div>
                    </div>
                  </div>
                  <div className="form-plant-container flex">
                    {displayClickedItems}
                  </div>
                </div>
              </div>

{/* *** ANIMALS DISPLAY *** */}
              <div
                className="middle-container"
                id="toggle-animals"
                style={{ display: "none" }}
              >
                <h2>Animals of Missouri</h2>
                <div className="row main-container">
                  <div className="leftside-container">
                    <div className="search-container">
                      <div className="sidebar-size-plants">
                        <input
                          className="search-plants"
                          onChange={changeAnimal}
                          placeholder="Find a plant by scientific or common name"
                        />
                        {displaySearchedAnimals}
                      </div>
                      <div className="small">
                        <small>
                          *List is not a comprehensive of all wildlife in
                          Missouri.
                        </small>
                      </div>
                      <div className="small">
                        <small>
                          *Data provided by{" "}
                          <a href="https://ecos.fws.gov/ecp0/reports/ad-hoc-species-report-input">
                            U.S Fish & Wildlife Service: ECOS
                          </a>
                        </small>
                      </div>
                    </div>
                  </div>
                  <div className="form-plant-container flex">
                    {displayClickedAnimal}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>

{/* ********** Update Form Return ********** */}
      <div id="update-form">
        <form className="form-history" onSubmit={updateTrip}>
          <div className="trip-parent-container">
            <div className="left-container"> {/* Update Form*/}
              <h2>Edit Trip</h2>
              <input
                type="text"
                name="id"
                value={id}
                onChange={(e) => setId(e.target.value)}
                disabled
                style={{ display: "none" }}
              />
              <label>
                Name:
                <input
                  type="text"
                  id="focusedTripName"
                  name="tripName"
                  value={tripName}
                  onChange={(e) => setTripName(e.target.value)}
                  required
                />
              </label>
              <label>
                Location:
                <select
                  className="display-block select-style"
                  name="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                >
                  <option value="" disabled>
                    Select a location
                  </option>
                  {locations.map((loc) => (
                    <option key={loc.ID} value={loc.LOC_NAME}>
                      {loc.LOC_NAME}
                    </option>
                  ))}
                </select>
              </label>
              <label className="display-block">
                Date:
                <input
                  type="date"
                  name="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </label>
              <label>
                Notes:
                <textarea
                  name="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </label>

              <button type="submit" id="btn-submit-trip">
                Updated Trip
              </button>
              <button
                type="button"
                onClick={() => {
                  setTripName("");
                  setLocation("");
                  setDate("");
                  setNotes("");
                  setPlants([]);
                  setFauna([]);
                  document.getElementById("submit-form").style.display =
                    "block";
                  document.getElementById("update-form").style.display = "none";
                }}
              >
                Clear Form
              </button>
            </div>
{/* *** Update Form Plant/Animal Buttons And Image Display *** */}
            <div className='tggl-display'>
{/* *** Update Form Toggle Button *** */}
              <button type="button" id="toggle-btn-edit" onClick={handleToggleClick} className='toggle-btn'>
                Animals
              </button>

{/* *** PLANTS DISPLAY *** */}
              <div
                className="middle-container"
                id="toggle-plants-edit"
                style={{ display: "block" }}
              >
                <h2>Plants of Missouri</h2>
                <div className="row main-container">
                  <div className="leftside-container">
                    <div className="search-container">
                      <div className="sidebar-size-plants">
                        <input
                          className="search-plants"
                          onChange={change}
                          placeholder="Find a plant by scientific or common name"
                        />
                        {displaySearchedItems}
                      </div>
                      <div className="small">
                        <small>
                          *List is not a comprehensive of all plants in Missouri
                        </small>
                      </div>
                      <div className="small">
                        <small>
                          *Data provided by{" "}
                          <a href="https://ecos.fws.gov/ecp0/reports/ad-hoc-species-report-input">
                            U.S Fish & Wildlife Service: ECOS
                          </a>
                        </small>
                      </div>
                    </div>
                  </div>
                  <div className="form-plant-container flex">
                    {displayClickedItems}
                  </div>
                </div>
              </div>

{/* *** ANIMALS DISPLAY *** */}
              <div
                className="middle-container"
                id="toggle-animals-edit"
                style={{ display: "none" }}
              >
                <h2>Animals of Missouri</h2>
                <div className="row main-container">
                  <div className="leftside-container">
                    <div className="search-container">
                      <div className="sidebar-size-plants">
                        <input
                          className="search-plants"
                          onChange={changeAnimal}
                          placeholder="Find a plant by scientific or common name"
                        />
                        {displaySearchedAnimals}
                      </div>
                      <div className="small">
                        <small>
                          *List is not a comprehensive of all wildlife in
                          Missouri.
                        </small>
                      </div>
                      <div className="small">
                        <small>
                          *Data provided by{" "}
                          <a href="https://ecos.fws.gov/ecp0/reports/ad-hoc-species-report-input">
                            U.S Fish & Wildlife Service: ECOS
                          </a>
                        </small>
                      </div>
                    </div>
                  </div>
                  <div className="form-plant-container flex">
                    {displayClickedAnimal}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HikeForm;
