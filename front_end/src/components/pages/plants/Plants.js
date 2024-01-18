import React, { useEffect, useState } from 'react';
import "../../../index.css";
import "./plantsStyles.css";


const DisplayPlants = () => {
// PLANTS DISPLAY
  const [val, setVal] = useState('');
  const [data, setData] = useState([]);
  const [click, setClick] = useState('');
  const urlPlants = "http://localhost:8080/plants";

  // Fetching plants database
  const fetchInfo = async () => {
    await fetch(urlPlants)
      .then((resData) => (resData.json()))
      .then(dData => setData(dData));
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
        <div  className='add-plant-form' >
          <label id={post.id} onClick={clicked} className='btn-plants'> {`${post.scientificName} (${post.commonName})`}</label>
        </div>
      </div>
      )
    })

// methods for displaying information of plant within plant-container
    const clickedItems = data.filter(post => {
      if(post.id == click){
        return post;
      }
    })

    const displayClickedItems = clickedItems.map(post => {
      return (
      <div key={post.id} className='flex'>
        <div className='plant-details'>
            <h3 className='plant-title'>{post.commonName}</h3>
            <p><b>Scientific Name:</b> {post.scientificName}</p>
            <p><b>Family: </b> {post.family}</p>
            <p><b>States found in: </b>{post.currentDistribution}</p>
            <p><b>Federal listing status: </b>{post.federalListingStatus}</p>
          </div>
          <div className='image-container'>
            <img className="plant-img-size" src={post.image} alt={post.commonName}/>
            <div className='photo-credit'><a href={post.photoCredit} target="_blank" rel="noreferrer">photo credit</a></div>
          </div>
        </div>)
    })
  
  return (
      <div className='page-container'>
        <h2>Plants of Missouri</h2>
        <h3 className='plant-title'>Select a plant to view more details</h3>
        <div className='row main-container'>
          <div className='leftside-container'>
            <div className='search-container'>
            <div className='sidebar-size-plants'>
              <input className="search-plants" onChange={change} placeholder="Find a plant by scientific or common name"/>
              {displaySearchedItems}
              </div>
              <div className='small'>
                <small>*List is not a comprehensive of all plants in Missouri</small>
              </div>
              <div className='small'>
                <small>*Data provided by <a href='https://ecos.fws.gov/ecp0/reports/ad-hoc-species-report-input'>U.S Fish & Wildlife Service: ECOS</a></small>
              </div>
            </div>
          </div>
          <div className='plant-container flex'>
            {displayClickedItems}
          </div>
        </div>
      </div>
        );
};

export default DisplayPlants;