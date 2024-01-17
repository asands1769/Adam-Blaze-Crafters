import React from "react";
import './About.css';
 
const Home = () => {
    return (
        <div className="page-container">
            <h1> State Parks Explorer </h1>
            <section id="about-us">
                <h2>About Us</h2>
                <p className="margin-10">Welcome to State Parks Explorer, your go-to web app for tracking your exploration of the beautiful State Parks in Missouri. Our platform is designed to make it easy for you to manage trips, providing a seamless experience as you embark on your outdoor adventures.</p>

                <h4>Key features of State Parks Explorer include:</h4>
                <ul className="margin-10">
                    <li>Access valuable information about each park, including location, weather updates, and details about local plants and animals.</li>
                    <li>Share your hiking experiences with a community of outdoor enthusiasts, fostering a sense of camaraderie among fellow hikers.</li>
                </ul>
                <p className="c-orange t-center">Join us in celebrating the beauty of Missouri's State Parks and start your exploration journey today!</p>
            </section>
            
        </div>
    );
};
 
export default Home;