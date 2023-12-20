
import React, { useEffect, useState } from 'react';
import "../../../index.css";
import "./plantsStyles.css";
import placeholderImage from "./pexels-photomix-company-1002703.jpg";

const Home = () => {

  const [val, setVal] = useState('');
  const [data, setData] = useState([]);
  const [click, setClick] = useState('');
  const urlPlants = "http://localhost:8080/plants";

  // Fetching trail_blazer database
  const fetchInfo = async () => {
    await fetch(urlPlants)
      .then((res) => res.json())
      .then((d) => setData(d))
  }

  useEffect(() => {
    fetchInfo();
  }, []);

   // setting val based on event provided in HTML section
   const change = event => {setVal(event.target.value)}
   const clicked = (event) => {
     setClick(event.target.id);
     
   }

    const searchItems = data.filter(post => {
      if(val === ''){
        return post;
      } else if (post.scientificName.toLowerCase().includes(val.toLowerCase()) || post.commonName.toLowerCase().includes(val.toLowerCase())){
        return post;
      }
    })

    const displaySearchedItems = searchItems.map(post => {
      return (
      <div key={post.id}>
        <button id={post.id} onClick={clicked} className='btn-plants'>{`${post.scientificName} (${post.commonName})`}</button>
      </div>
      )
    })

    const clickedItems = data.filter(post => {
      if(post.id == click){
        return post;
      }
      
    })

    const displayClickedItems = clickedItems.map(post => {
      return (
      <div key={post.id} className='flex'>
        <div className='plant-details'>
            <h3>{post.commonName}</h3>
            <p>{`Scientific Name: ${post.scientificName}`}</p>
            <p>Family: {post.family}</p>
            <p>States found in: {post.currentDistribution}</p>
            {/* {if (post.FederalListingStatus)} */}
            <p>Federal listing status: {post.federalListingStatus}</p>
          </div>
          <img className="plant-img-size" src={placeholderImage} alt="a plant sprouting with four leaves"/>
        </div>)
    })

  

 

    


  return (
      <div>
          <h2>Plants of Missouri</h2>
        <div className='row'>
          <div className='search-container'>
          <div className='small'><small>*List is not a comprehensive list of plants in Missouri</small></div>
          <div className='small'><small>**Data provided by <a href='https://ecos.fws.gov/ecp0/reports/ad-hoc-species-report-input'>U.S Fish & Wildlife Service: ECOS</a></small></div>
          <input className="search-plants" onChange={change} placeholder="Find a plant by scientific or common name"/>
          <div className='sidebar-size'>
            {displaySearchedItems}
          </div>
          </div>
          <div id='plant-toggle' className='plant-container flex'>
            {displayClickedItems}
          </div>
        </div>
      </div>
        );
};

export default Home;

// Photo by PhotoMIX Company: https://www.pexels.com/photo/closeup-photo-of-sprout-1002703/