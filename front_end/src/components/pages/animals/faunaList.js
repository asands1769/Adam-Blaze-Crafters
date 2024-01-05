import React, { useEffect, useState } from "react";
import "../../../index.css";
import "./animalStyles.css";

const FaunaList = () => {

  const [data, setData] = useState([]);
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const urlFaunaList = "http://localhost:8080/animals";
//fetch data from database
  const fetchInfo = async () => {
    await fetch(urlFaunaList)
      .then((res) => res.json())
      .then((d) => setData(d));
  };

  useEffect(() => {
    fetchInfo();
  }, []);
//map through data from database and capture selected animal
  const animalArray = data.map((animal) => animal);

  const handleAnimalChange = (e) => {
    const selectedValue = e.target.value;
    const selectedAnimalData = animalArray.find(
      (animal) => animal.commonName === selectedValue
    );
    setSelectedAnimal(selectedAnimalData);
  };

  return (
    <div className="display-animals">
        <div className="animal-drop-container">
            <select className="animal-drop-down" onChange={handleAnimalChange}>
            <option value="placeholder">Select an Animal</option>
            {animalArray.map((animal) => (
                <option key={animal.id}>{animal.commonName}</option>
            ))}
            </select>
        </div>
        <div className="animal-data-container">
            <h2>Missouri Wildlife</h2>
            {selectedAnimal && (
            <div className="animal-data">
                <img src={selectedAnimal.image} alt="" className="animal-image"/>
                <p>{selectedAnimal.commonName}</p>
                <p>Scientific Name: {selectedAnimal.scientificName}</p>
                <p>Family: {selectedAnimal.family}</p>
                <p>Can be found in the following states: {selectedAnimal.currentDistribution}</p>
            </div>
            )}
        </div>
        </div>
    );
};
export default FaunaList;


