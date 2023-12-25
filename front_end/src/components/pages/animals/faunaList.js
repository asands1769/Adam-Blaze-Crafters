import React, { useEffect, useState } from "react";
import "../../../index.css";
import "./animalStyles.css"

const FaunaList = () => {
  
    const [data, setData] = useState([]);
    const urlFaunaList = "http://localhost:8080/animals";

    const fetchInfo = async () => {
        await fetch(urlFaunaList)
        .then((res) => res.json())
        .then((d) => setData(d));
    };

    useEffect(() => {
        fetchInfo();
    }, []);

    const animalArray = [];
    for (let i = 0; i < data.length; i++) {
        animalArray.push(data[i]);
    }

    const selectAnimal = document.querySelector('.animalDropDown');
    let result;

  const renderAnimalData = () => {
            if(selectAnimal) {
                selectAnimal.addEventListener('change', (e) => {
                    result = e.target.value;
                    animalArray.map((animal) => {
                        if(animal.commonName === result) {
                            console.log(animal.image);
                            console.log(animal.commonName);
                            console.log(animal.family);
                            console.log(animal.currentDistribution);
                            return (
                                <div>
                                    <img src={animal.image} alt=''/>
                                    <p>{animal.commonName}</p>
                                    <p>{animal.family}</p>
                                    <p>{animal.currentDistribution}</p>
                                </div>
                            );
                        }
                    });
                });
            }
        }

    
    return (
        <div className='displayAnimals'>
            <div className='animalDropContainer'>
                <select className='animalDropDown'>
                    <option value='placeholder'>Select an Animal</option>
                    {animalArray.map((animal) => (
                        <option key={animal.id}>{animal.commonName}</option>
                    ))}
                </select>
            </div>
            
            <div className='animalData'>
                <h2>Display Animal Here</h2>
                {renderAnimalData()}
            </div>
        </div>
    );
};

export default FaunaList;
