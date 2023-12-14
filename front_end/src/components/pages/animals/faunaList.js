import React, { useEffect, useState } from "react";

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
    
    return (
        <div>
            <select defaultValue={"placeholder"}>
                <option value={"placeholder"}>Select an Animal</option>
                {animalArray.map((animal) => (
                    <option key={animal.id}>{animal.commonName}</option>
                ))}
            </select>
        </div>
    );
};

export default FaunaList;
