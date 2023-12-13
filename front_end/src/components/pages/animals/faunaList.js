import React, { useEffect, useState } from 'react';

const FaunaList = () => {

    const [data, setData] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/animals")
            .then(res => res.json())
            .then(data => setData(data));
    }, []);

    return (
        <div>
            {data.map(item => (
                <select key={item.id}>
                    <option>{item.commonName}</option>
                </select>
            ))}
        </div>
    )

}

export default FaunaList;