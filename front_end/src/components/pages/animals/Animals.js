import React from "react";
import FaunaList from "./faunaList";
import "./animalStyles.css";
 
const Home = () => {
    return (
        <>
            <h1>
                Search for an Animal
            </h1>

            <div>
                <FaunaList />
            </div>
        
        </>
        
    );
};
 
export default Home;