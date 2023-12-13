import React from "react";
import FaunaList from "./faunaList";
 
const Home = () => {
    return (
        <>
            <h1>
                Find an animal you encoutered at a park.
            </h1>

            <div>
                <FaunaList />
            </div>
        
        </>
        
    );
};
 
export default Home;