import React from "react";
import FaunaList from "./faunaList";
import "./animalStyles.css";
 
const Home = () => {
    return (
        <div className='page-container'>
            <h1>
                Search for an Animal
            </h1>

            <div>
                <FaunaList />
            </div>
        
        </div> 
    );
};
 
export default Home;