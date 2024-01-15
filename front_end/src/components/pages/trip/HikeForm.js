import React, { useState, useEffect } from "react";
import csvData from "../../../databases/park_locations/MO_State_Park_and_Historic_Sites_Trails.csv";
//import DisplayPlants from "../plants/Plants";
// import useForm from './UseForm';

const FORM_ENDPOINT = "http://localhost:8080/trips/add";

const HikeForm = ({ onSubmit, selectedHike, onEdit }) => {
  const [id, setId] = useState("");
  const [tripName, setTripName] = useState("");
  const [trips, setTrips] = useState([]);
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
  // const [toggle, setToggle] = useState(false);

  const urlPlants = "http://localhost:8080/plants";
  const urlTrips = "http://localhost:8080/trips/all";

  // const imageCheckbox = document.querySelectorAll(".checkbox-style");
  const updateForm = document.getElementById("update-form");

  useEffect(() => {
    // Fetch and parse the CSV file
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

    fetchData();
  }, []); // Empty dependency array to fetch locations only once on component mount

  useEffect(() => {
    // Populate form fields when selectedHike changes
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

  useEffect(() => {
    if (document.getElementById("update-form").style.display === "block") {
      const updateFormAddBtn = updateForm.querySelectorAll("#add-btn-plant");
      for (const chmk of updateFormAddBtn) {
        const markId =
        chmk.parentElement.parentElement.firstElementChild.firstChild.id;
        chmk.lastChild.style.visibility = "hidden";
        chmk.firstElementChild.disabled = false;
        chmk.lastElementChild.disabled = true;
        //console.log(imageCheckbox)
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

  useEffect (() => {
    if (document.getElementById("update-form").style.display === "block") {
    const updateAnimalFormAddBtn = updateForm.querySelectorAll("#add-btn-animal");
    for (const animalChmk of updateAnimalFormAddBtn) {
      const markAnimalId = 
      animalChmk.parentElement.parentElement.firstElementChild.firstChild.id;
      animalChmk.lastChild.style.visibility = "hidden";
      animalChmk.firstElementChild.disabled = false;
      animalChmk.lastElementChild.disabled = true;

      fauna.map((item) => {
        if (Number(item.id) === Number(markAnimalId)) {
          animalChmk.lastChild.style.visibility = "visible";
          animalChmk.firstElementChild.disabled = true;
          animalChmk.lastElementChild.disabled = false;
        }
      })
    }
  }
  });

  const submitForm = document.getElementById("submit-form");

  function deleteCheckmarks() {
    const submitCheckbox = submitForm.querySelectorAll("#add-btn-plant");
    for (const chmk of submitCheckbox) {
      chmk.lastChild.style.visibility = "hidden";
      chmk.firstElementChild.disabled = false;
      chmk.lastElementChild.disabled = true;
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalFormEndpoint = e.target.action;
    const data = {
      tripName: tripName,
      location: location,
      date: date,
      notes: notes,
      plants: plants,
      fauna: fauna,
    };
    console.log(data);

    fetch(finalFormEndpoint, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (selectedHike) {
      onEdit({
        ...selectedHike,
        tripName,
        location,
        date,
        notes,
        plants,
        fauna,
      });
    } else {
      onSubmit({ tripName, location, date, notes, plants, fauna });
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

  function updateTrip() {
    const finalFormEndpointUpdate = "http://localhost:8080/trips/update/" + id;
    const updatedData = {
      tripName: tripName,
      location: location,
      date: date,
      notes: notes,
      plants: plants,
      fauna: fauna
    };
    console.log(updatedData);

    fetch(finalFormEndpointUpdate, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    }).then((response) => {
      return response.json();
    })
    .then((updatedDate) => {});
    if (selectedHike) {
      onEdit({
        ...selectedHike,
        id,
        tripName,
        location,
        date,
        notes,
        plants,
        fauna
      });
    } else {
      onSubmit({ id, tripName, location, date, notes, plants, fauna });
    }
  }

  // PLANTS DISPLAY
  // Fetching data from
  const fetchInfo = async () => {
    Promise.all([
      await fetch(urlPlants), 
      await fetch(urlTrips)
    ])
      .then(([resData, resTrips]) =>
        Promise.all([resData.json(), resTrips.json()])
      )
      .then(([dData, dTrips]) => {
        setData(dData);
        setTrips(dTrips);
      });
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  // setting val based on event provided in HTML section and click based on click to display image of plant
  const change = (event) => {setVal(event.target.value);};
  const clicked = (event) => {setClick(event.target.id);};
  //SEARCH BAR FUNCTION TO DISPLAY WHAT USER TYPES
  //PLANTS DATA
  const searchItems = data.filter((post) => {
    if (val === "") {
      return post;
    } else if (post.scientificName.toLowerCase().includes(val.toLowerCase()) ||
      post.commonName.toLowerCase().includes(val.toLowerCase())){
        return post;
      }
  });

  // DISPLAY CHECKBOX, NAME, ADD BUTTON, AND DELETE, BUTTON WITH METHODS TO ADD OR DELETE PLANT FROM ARRAY.
  const displaySearchedItems = searchItems.map((post) => {
    return (
      <div key={post.id}>
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

  // methods for displaying information of plant within plant-container
  const clickedItems = data.filter((post) => {
    if (Number(post.id) === Number(click)) {
      return post;
    }
  });

  const displayClickedItems = clickedItems.map((post) => {
    return (
      <div key={post.id} className="flex">
        <div className="image-container">
          <img
            className="plant-img-size"
            src={post.image}
            alt={post.commonName}
          />
          <div className="photo-credit">
            <a href={post.photoCredit} target="_blank" rel="noreferrer">
              photo credit
            </a>
          </div>
        </div>
      </div>
    );
  });

  //*************** Animals ************//

  //FETCHING ANIMALS FROM DB
  const fetchAnimalInfo = async () => {
    await fetch("http://localhost:8080/animals")
      .then((res) => res.json())
      .then((d) => setAnimals(d));
  };

  useEffect(() => {
    fetchAnimalInfo();
  }, []);

  //setting animal based on event provided in HTML section and click based on click to display image of animal
  const changeAnimal = (e) => {setAnimal(e.target.value);};
  const animalClicked = (e) => {setClickedAnimal(e.target.id);};
  //search bar function to filter list of animals according to what the user types in search bar
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

  const displaySearchedAnimals = searchFauna.map((post) => {
    return (
      <div key={post.id}>
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

  // methods for displaying information of animal within container
  const selectedAnimal = animals.filter((item) => {
    if (Number(item.id) === Number(clickedAnimal)) {
      return item;
    }
  });

  const displayClickedAnimal = selectedAnimal.map((animal) => {
    return (
      <div key={animal.id} className="flex">
        <div className="image-container">
          <img
            className="plant-img-size"
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

  return (
    <>
      <div id="submit-form">
        <form onSubmit={handleSubmit} method="POST" action={FORM_ENDPOINT}>
          <div className="parent-container">
            <div className="left-container">
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
                {/* Use a dropdown select element */}
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

            {/* PLANTS DISPLAY */}
            <div className="middle-container">
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
                <div className="plant-container flex">
                  {displayClickedItems}
                </div>
              </div>
            </div>

            {/* ANIMALS DISPLAY */}
            <div className="middle-container">
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
                <div className="plant-container flex">
                  {displayClickedAnimal}
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* EDIT TRIP */}
      <div id="update-form">
        <form className="form-history" onSubmit={updateTrip}>
          <div className="parent-container">
            <div className="left-container">
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
            <div className="plants-and-animals-container">
              <div className="middle-container">
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
                  <div className="plant-container flex">
                    {displayClickedItems}
                  </div>
                </div>
              </div>

              <div className="middle-container">
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
                  <div className="plant-container flex">
                    {displayClickedAnimal}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default HikeForm;
